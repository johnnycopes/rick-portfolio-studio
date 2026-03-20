import {defineField, defineType} from 'sanity'

export const miscSongs = defineType({
  name: 'miscSongs',
  title: 'Songs',
  type: 'document',
  fields: [
    defineField({
      name: 'songs',
      title: 'Songs',
      type: 'array',
      description: 'Favorite songs. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'song',
          title: 'Song',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'artist',
              title: 'Artist',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'artist',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Songs'}
    },
  },
})
