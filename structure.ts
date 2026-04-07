// structure.ts
//
// Sidebar layout:
//
//   Content
//   ├── Work Projects
//   │   ├── Ordered         (drag-and-drop)
//   │   ├── ──────────
//   │   ├── By Title        (A→Z)
//   │   └── By Client       (grouped)
//   └── About               (singleton)

import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const ABOUT_ID = 'about'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // ── Work Projects ───────────────────────────────────────
      S.listItem()
        .title('Work')
        .child(
          S.list()
            .title('Work Projects')
            .items([
              orderableDocumentListDeskItem({
                type: 'workProject',
                title: 'Ordered',
                S,
                context,
              }),

              S.divider(),

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

      // ── About ───────────────────────────────────────────────
      S.listItem().title('About').child(S.document().schemaType('about').documentId(ABOUT_ID)),

    ])
