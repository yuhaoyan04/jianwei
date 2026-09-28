interface Env {
  VIEWS: KVNamespace;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

async function getCount(env: Env, slug: string): Promise<number> {
  const val = await env.VIEWS.get(slug);
  return val ? parseInt(val, 10) || 0 : 0;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const slug = new URL(request.url).searchParams.get('slug') || '';
  if (!slug) return json({ error: 'missing slug' }, 400);
  return json({ views: await getCount(env, slug) });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let slug = '';
  try {
    slug = (await request.json()).slug || '';
  } catch {
    return json({ error: 'invalid body' }, 400);
  }
  if (!slug) return json({ error: 'missing slug' }, 400);
  const views = (await getCount(env, slug)) + 1;
  await env.VIEWS.put(slug, String(views));
  return json({ views });
};
