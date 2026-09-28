import { getCollection, type CollectionEntry } from 'astro:content';

export async function loadAll() {
  const seriesAll = (await getCollection('series')).filter((s) => !s.data.draft);
  const articlesAll = (await getCollection('articles')).filter((a) => !a.data.draft);
  const seriesMap = new Map(seriesAll.map((s) => [s.id, s]));
  const articleSection = (a: CollectionEntry<'articles'>) =>
    seriesMap.get(a.data.series)?.data.section;
  return { seriesAll, articlesAll, seriesMap, articleSection };
}

export function sortByPublished<T extends { data: { published: Date } }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => +b.data.published - +a.data.published);
}

export function sortByPart<T extends { data: { seriesPart: number } }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => a.data.seriesPart - b.data.seriesPart);
}

export function sortByOrder<T extends { data: { order: number } }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => a.data.order - b.data.order);
}

export async function seriesForSection(section: string) {
  const { seriesAll } = await loadAll();
  return sortByOrder(seriesAll.filter((s) => s.data.section === section));
}

export async function articlesForSeries(seriesId: string) {
  const { articlesAll } = await loadAll();
  return sortByPart(articlesAll.filter((a) => a.data.series === seriesId));
}

export function articleHref(section: string, seriesId: string, articleId: string) {
  return `/${section}/${seriesId}/${articleId}`;
}

export function seriesHref(section: string, seriesId: string) {
  return `/${section}/${seriesId}`;
}

export function fmtDate(d: Date) {
  return new Date(d)
    .toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '-');
}
