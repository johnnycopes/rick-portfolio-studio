// structure.ts
//
// Sidebar layout:
//
//   Content
//   ├── Work Projects
//   │   ├── Ordered         (drag-and-drop)
//   │   ├── ──────────
//   │   ├── By Title        (flat A→Z list)
//   │   └── By Client       (grouped by client name)
//   ├── ──────────
//   └── Misc
//       ├── Websites        (singleton)
//       ├── Songs           (singleton)
//       └── Instagrams      (singleton)

import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// Fixed document IDs for singletons.
// Used here in the structure and in the migration script.
export const MISC_WEBSITES_ID = 'miscWebsites'
export const MISC_SONGS_ID = 'miscSongs'
export const MISC_INSTAGRAMS_ID = 'miscInstagrams'

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
                .child(S.document().schemaType('miscWebsites').documentId(MISC_WEBSITES_ID)),
              S.listItem()
                .title('Songs')
                .child(S.document().schemaType('miscSongs').documentId(MISC_SONGS_ID)),
              S.listItem()
                .title('Instagrams')
                .child(S.document().schemaType('miscInstagrams').documentId(MISC_INSTAGRAMS_ID)),
            ]),
        ),
    ])
