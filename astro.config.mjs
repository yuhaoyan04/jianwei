import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://jianwei-note.pages.dev',
  trailingSlash: 'never',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: { class: 'anchor', ariaHidden: 'true', tabIndex: -1 },
        content: { type: 'text', value: '#' },
      }],
      rehypeKatex,
    ],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
