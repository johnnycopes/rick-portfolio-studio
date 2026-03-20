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
//   ├── ──────────
//   └── Misc
//       ├── Websites        (A→Z by name)
//       ├── Songs           (A→Z by title)
//       └── Instagrams      (A→Z by handle)

import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // ── Work Projects ───────────────────────────────────────
      S.listItem()
        .title('Work Projects')
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

      S.divider(),

      // ── Misc ────────────────────────────────────────────────
      S.listItem()
        .title('Misc')
        .child(
          S.list()
            .title('Misc')
            .items([
              S.listItem()
                .title('Websites')
                .child(
                  S.documentList()
                    .title('Websites')
                    .schemaType('miscWebsite')
                    .apiVersion('2024-01-01')
                    .filter('_type == "miscWebsite"')
                    .defaultOrdering([{field: 'name', direction: 'asc'}]),
                ),

              S.listItem()
                .title('Songs')
                .child(
                  S.documentList()
                    .title('Songs')
                    .schemaType('miscSong')
                    .apiVersion('2024-01-01')
                    .filter('_type == "miscSong"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),

              S.listItem()
                .title('Instagrams')
                .child(
                  S.documentList()
                    .title('Instagrams')
                    .schemaType('miscInstagram')
                    .apiVersion('2024-01-01')
                    .filter('_type == "miscInstagram"')
                    .defaultOrdering([{field: 'handle', direction: 'asc'}]),
                ),
            ]),
        ),
    ])
