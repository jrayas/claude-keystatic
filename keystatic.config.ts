import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({ label: 'Publish Date' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    docs: collection({
      label: 'Documentation Hub',
      slugField: 'title',
      path: 'src/content/docs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Architecture', value: 'architecture' },
            { label: 'Guides', value: 'guides' },
            { label: 'API Reference', value: 'api' },
          ],
          defaultValue: 'guides',
        }),
        order: fields.integer({ label: 'Order / Weight', defaultValue: 0 }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    cheatsheets: collection({
      label: 'Cheatsheets',
      slugField: 'title',
      path: 'src/content/cheatsheets/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        language: fields.text({ label: 'Programming Language / Topic' }),
        summary: fields.text({ label: 'Quick Reference Summary', multiline: true }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
