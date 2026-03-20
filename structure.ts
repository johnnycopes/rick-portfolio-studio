// structure.ts
//
// Sidebar layout:
//
//   Content
//   ├── Work Projects
//   │   ├── Ordered
//   │   ├── ──────────
//   │   ├── By Title
//   │   └── By Client
//   ├── ──────────
//   └── Misc
//       ├── Websites
//       │   ├── Ordered        (drag-and-drop)
//       │   └── Alphabetical   (A→Z by name)
//       ├── Songs
//       │   ├── Ordered        (drag-and-drop)
//       │   └── Alphabetical   (A→Z by title)
//       └── Instagrams
//           ├── Ordered        (drag-and-drop)
//           └── Alphabetical   (A→Z by handle)

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
              // Websites
              S.listItem()
                .title('Websites')
                .child(
                  S.list()
                    .title('Websites')
                    .items([
                      orderableDocumentListDeskItem({
                        type: 'miscWebsite',
                        title: 'Ordered',
                        S,
                        context,
                      }),
                      S.listItem()
                        .title('Alphabetical')
                        .child(
                          S.documentList()
                            .title('Alphabetical')
                            .schemaType('miscWebsite')
                            .apiVersion('2024-01-01')
                            .filter('_type == "miscWebsite"')
                            .defaultOrdering([{field: 'name', direction: 'asc'}]),
                        ),
                    ]),
                ),

              // Songs
              S.listItem()
                .title('Songs')
                .child(
                  S.list()
                    .title('Songs')
                    .items([
                      orderableDocumentListDeskItem({
                        type: 'miscSong',
                        title: 'Ordered',
                        S,
                        context,
                      }),
                      S.listItem()
                        .title('Alphabetical')
                        .child(
                          S.documentList()
                            .title('Alphabetical')
                            .schemaType('miscSong')
                            .apiVersion('2024-01-01')
                            .filter('_type == "miscSong"')
                            .defaultOrdering([{field: 'title', direction: 'asc'}]),
                        ),
                    ]),
                ),

              // Instagrams
              S.listItem()
                .title('Instagrams')
                .child(
                  S.list()
                    .title('Instagrams')
                    .items([
                      orderableDocumentListDeskItem({
                        type: 'miscInstagram',
                        title: 'Ordered',
                        S,
                        context,
                      }),
                      S.listItem()
                        .title('Alphabetical')
                        .child(
                          S.documentList()
                            .title('Alphabetical')
                            .schemaType('miscInstagram')
                            .apiVersion('2024-01-01')
                            .filter('_type == "miscInstagram"')
                            .defaultOrdering([{field: 'handle', direction: 'asc'}]),
                        ),
                    ]),
                ),
            ]),
        ),
    ])
