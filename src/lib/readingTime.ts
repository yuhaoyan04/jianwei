export function wordCount(body: string | undefined): number {
  if (!body) return 0;
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_\-`~\[\]()!|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = (text.replace(/[\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
  return cjk + words;
}

export function readingTime(body: string | undefined): number {
  return Math.max(1, Math.round(wordCount(body) / 400));
}
