// structure.ts
//
// Paste this into your sanity.config.ts structureTool({ structure }) config,
// or import it from a separate file.
//
// This gives you:
//
//   Content
//   ├── Work Projects
//   │   ├── Ordered         (drag-and-drop)
//   │   ├── ──────────
//   │   ├── By Title        (flat A→Z list)
//   │   └── By Client       (grouped by client name)
//   ├── ──────────
//   └── Misc Page           (singleton: websites, songs, instagrams)

import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// The fixed document ID for the Misc singleton.
// When creating it for the first time in the Studio, this ID is used
// so there's always exactly one Misc Page document.
export const MISC_PAGE_ID = 'miscPage'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // ── Work Projects (nested) ──────────────────────────────
      S.listItem()
        .title('Work Projects')
        .child(
          S.list()
            .title('Work Projects')
            .items([
              // Drag-and-drop ordering
              orderableDocumentListDeskItem({
                type: 'workProject',
                title: 'Ordered',
                S,
                context,
              }),

              S.divider(),

              // Alphabetical by Title
              S.listItem()
                .title('By Title')
                .child(
                  S.documentList()
                    .title('By Title')
                    .schemaType('workProject')
                    .apiVersion('2024-01-01')
                    .filter('_type == "workProject"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),

              // Grouped by Client
              S.listItem()
                .title('By Client')
                .child(async () => {
                  const clients = await context
                    .getClient({apiVersion: '2024-01-01'})
                    .fetch(`array::unique(*[_type == "workProject"].client) | order(@ asc)`)

                  return S.list()
                    .title('Clients')
                    .items(
                      clients.map((client: string) =>
                        S.listItem()
                          .title(client)
                          .child(
                            S.documentList()
                              .title(client)
                              .schemaType('workProject')
                              .apiVersion('2024-01-01')
                              .filter('_type == "workProject" && client == $client')
                              .params({client}),
                          ),
                      ),
                    )
                }),
            ]),
        ),

      S.divider(),

      // ── Misc Page (singleton) ───────────────────────────────
      S.listItem()
        .title('Misc Page')
        .child(S.document().schemaType('miscPage').documentId(MISC_PAGE_ID)),
    ])
