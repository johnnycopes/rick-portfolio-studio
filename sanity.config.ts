import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: "Rick's Portfolio",

  projectId: 'hzn4ro6m',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
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
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
