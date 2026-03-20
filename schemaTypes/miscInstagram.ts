import {defineField, defineType} from 'sanity'

export const miscInstagram = defineType({
  name: 'miscInstagram',
  title: 'Instagram',
  type: 'document',
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
})
