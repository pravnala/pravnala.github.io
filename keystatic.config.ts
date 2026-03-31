import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({ label: 'Publish Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Tech', value: 'tech' },
            { label: 'Martial Arts', value: 'martial-arts' },
          ],
          defaultValue: 'tech',
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    work: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        projectContext: fields.text({ label: 'Project Context', multiline: true }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/work',
          publicPath: '/images/work/',
        }),
        problem: fields.text({ label: 'Problem Statement', multiline: true }),
        solution: fields.text({ label: 'Solution', multiline: true }),
        outcome: fields.text({ label: 'Outcome', multiline: true }),
        technologies: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Technologies',
          itemLabel: (props) => props.value,
        }),
        isPublic: fields.checkbox({ label: 'Public', defaultValue: true }),
        order: fields.integer({ label: 'Display Order' }),
        content: fields.markdoc({ label: 'Full Content' }),
      },
    }),
  },
});
