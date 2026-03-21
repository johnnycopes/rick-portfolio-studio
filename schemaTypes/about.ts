import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main heading on the About page (e.g., "Hey, it\'s me — Rick.")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Your profile photo.',
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
      name: 'resume',
      title: 'Résumé (PDF)',
      type: 'file',
      description: 'Upload your résumé as a PDF. This will be linked from the About page.',
      options: {
        accept: '.pdf',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Your contact email address.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      description:
        "These are used on both the About page and the site header. Update them here and they'll change everywhere.",
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
      ],
    }),
    defineField({
      name: 'funButton',
      title: 'Fun Button',
      type: 'object',
      description: 'The surprise link at the bottom of the About page.',
      fields: [
        defineField({
          name: 'text',
          title: 'Label',
          type: 'string',
          description: 'The button text (e.g., "Random Wiki")',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About'}
    },
  },
})
