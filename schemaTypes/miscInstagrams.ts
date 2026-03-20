import {defineField, defineType} from 'sanity'

export const miscInstagrams = defineType({
  name: 'miscInstagrams',
  title: 'Instagrams',
  type: 'document',
  fields: [
    defineField({
      name: 'instagrams',
      title: 'Instagrams',
      type: 'array',
      description: 'Instagram handles to follow. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'instagram',
          title: 'Instagram',
          fields: [
            defineField({
              name: 'handle',
              title: 'Handle',
              type: 'string',
              description: 'Just the username, no @ needed.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'handle',
            },
            prepare({title}) {
              return {title: `@${title}`}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Instagrams'}
    },
  },
})
