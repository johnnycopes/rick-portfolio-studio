import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const miscInstagram = defineType({
  name: 'miscInstagram',
  title: 'Instagram',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'miscInstagram'}),
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
