import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const workProject = defineType({
  name: 'workProject',
  title: 'Work Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The name of the project (e.g., "Sweaty Boy", "A Better Tomorrow")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'The URL-friendly identifier for this project. Click Generate to create one from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description:
        'The brand or company the project was made for (e.g., "Travelers", "Mountain Dew")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description:
        'Only active projects are shown on the Work page. Uncheck to hide a project without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description:
        'The preview image shown on the Work listing page. Recommended aspect ratio: 16:9.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'The video(s) displayed on the project detail page. Add one or more.',
      of: [
        {
          type: 'object',
          name: 'video',
          title: 'Video',
          fields: [
            defineField({
              name: 'videoTitle',
              title: 'Video Title',
              type: 'string',
              description:
                'The label shown above the video (e.g., "TV", "Case Study", "Full-Length Song")',
            }),
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description:
                'Paste the full Vimeo or YouTube URL (e.g., https://player.vimeo.com/video/...)',
              validation: (rule) =>
                rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'videoTitle',
              subtitle: 'url',
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    orderRankField({type: 'workProject'}),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'thumbnail',
      isActive: 'isActive',
    },
    prepare({title, subtitle, media, isActive}) {
      return {
        title: `${isActive === false ? '🚫 ' : ''}${title}`,
        subtitle,
        media,
      }
    },
  },
})
