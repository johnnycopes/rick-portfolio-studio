import {defineField, defineType} from 'sanity'

export const miscWebsites = defineType({
  name: 'miscWebsites',
  title: 'Websites',
  type: 'document',
  fields: [
    defineField({
      name: 'websites',
      title: 'Websites',
      type: 'array',
      description: 'Cool websites worth sharing. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'website',
          title: 'Website',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Websites'}
    },
  },
})
