import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const siteUrl = process.env.SITE_URL || 'https://www.kickbackmakechange.org';

const slugify = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || null;

function loadCollection(name) {
  const dir = path.join(projectRoot, 'src', 'content', name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const filepath = path.join(dir, file);
      const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      const slug = slugify(data.slug || data.id || file.replace(/\.json$/, ''));
      return { slug, file, ...data };
    });
}

function buildRouteList() {
  const routes = new Map();

  const addRoute = (path, meta = {}) => {
    if (!path) return;
    routes.set(path, { path, ...meta, ...(routes.get(path) || {}) });
  };

  const staticRoutes = [
    '/',
    '/landing',
    '/home',
    '/mission',
    '/projects',
    '/reports',
    '/team',
    '/contact',
    '/testimonials',
  ];
  staticRoutes.forEach((route) => addRoute(route));

  const projects = loadCollection('projects');
  projects.forEach((project) => {
    const slug = project.slug || slugify(project.title);
    if (slug) addRoute(`/projects/${encodeURIComponent(slug)}`);
  });

  const reports = loadCollection('reports');
  reports.forEach((report) => {
    const slug = report.slug || slugify(report.name || report.title);
    const lastmod = report.date || report.lastmod;
    if (slug) addRoute(`/reports/${encodeURIComponent(slug)}`, { lastmod });
  });

  const team = loadCollection('team');
  team.forEach((member) => {
    const slug =
      member.slug || member.id || (member.name ? slugify(member.name) : null) || slugify(member.file);
    if (slug) addRoute(`/team/${encodeURIComponent(slug)}`);
  });

  return Array.from(routes.values()).sort((a, b) => a.path.localeCompare(b.path));
}

async function prerender() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist directory not found. Run "vite build" first.');
  }

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const vite = await createServer({
    root: projectRoot,
    logLevel: 'error',
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

  const routes = buildRouteList();
  console.log(`Prerendering ${routes.length} routes...`);

  for (const route of routes) {
    const appHtml = await render(route.path);
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    const outPath =
      route.path === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
  }

  await vite.close();

  writeRobots(routes);
  writeSitemap(routes);
  console.log('Prerender complete.');
}

function writeRobots(routes) {
  const lines = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
    `Host: ${siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}`,
  ];
  fs.writeFileSync(path.join(distDir, 'robots.txt'), lines.join('\n'), 'utf-8');
  console.log('robots.txt written');
}

function writeSitemap(routes) {
  const entries = routes.map((route) => {
    const loc = `${siteUrl.replace(/\/$/, '')}${route.path === '/' ? '' : route.path}`;
    const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : '';
    const priority =
      route.path === '/' || route.path === '/home'
        ? '\n    <priority>0.9</priority>'
        : route.path === '/mission'
          ? '\n    <priority>0.8</priority>'
          : '';
    return `  <url>\n    <loc>${loc}</loc>${lastmod}${priority}\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
    '\n',
  )}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log('sitemap.xml written');
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
