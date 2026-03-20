import {defineField, defineType} from 'sanity'

export const miscPage = defineType({
  name: 'miscPage',
  title: 'Misc Page',
  type: 'document',
  fields: [
    defineField({
      name: 'websites',
      title: 'Websites',
      type: 'array',
      description: 'Cool websites worth sharing.',
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
    defineField({
      name: 'songs',
      title: 'Songs',
      type: 'array',
      description: 'Favorite songs.',
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
    defineField({
      name: 'instagrams',
      title: 'Instagrams',
      type: 'array',
      description: 'Instagram handles to follow (without the @).',
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
      return {title: 'Misc Page'}
    },
  },
})
