const collections = {
  projects: import.meta.glob('./projects/*.json', { eager: true }),
  articles: import.meta.glob('./articles/*.json', { eager: true }),
};

const byOrder = (a, b) => {
  const left = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
  const right = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
  if (left === right) {
    return (a.title ?? '').localeCompare(b.title ?? '');
  }
  return left - right;
};

const toEntry = (path, payload) => {
  const data = payload?.default ?? payload;
  if (!data) {
    return { slug: path };
  }

  if (data.id) {
    return { ...data };
  }

  const slug = path.split('/').pop()?.replace('.json', '') ?? path;
  return { slug, ...data };
};

export function getContent(key) {
  const group = collections[key];
  if (!group) {
    throw new Error(`Unknown content group: ${key}`);
  }

  return Object.entries(group)
    .map(([path, mod]) => toEntry(path, mod))
    .sort(byOrder);
}
