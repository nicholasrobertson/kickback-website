import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import { getContent } from './content/helper.js';
import { formatInline } from './utils/projects.js';

const fallbackTestimonies = getContent('testimonies');

function MetaText(testimony) {
  const parts = [testimony?.author, testimony?.organisation].filter(Boolean);
  if (parts.length === 0) {
    return testimony?.author ?? '';
  }
  return parts.join(' · ');
}

function Card({ testimony, variant = 'secondary' }) {
  if (!testimony) {
    return null;
  }
  const imageSrc = testimony.image || './images/header-placeholder.jpg';
  const className = `testimony-card${variant === 'primary' ? ' primary' : ''}`;
  const metaText = MetaText(testimony);

  return (
    <div className={className} id={`testimony-${testimony.id ?? 'item'}`}>
      <div className="testimony-card-body">
        {testimony.body && (
          <div
            className="testimony-body"
            dangerouslySetInnerHTML={{ __html: formatInline(testimony.body) }}
          />
        )}
        <div className="testimony-meta">
          <img className="testimony-avatar" src={imageSrc} alt={`${testimony.author} avatar`} />
          <span>{metaText}</span>
        </div>
        {testimony.video && <div className="testimony-tag">Video</div>}
      </div>
    </div>
  );
}

export default function TestimoniesPage({ testimonies = fallbackTestimonies }) {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('id');
  const list = Array.isArray(testimonies) ? [...testimonies] : [];
  const selected =
    list.find((item) => (item.id ?? item.title) === selectedId) ?? list[0] ?? null;
  const remaining = selected
    ? list.filter((item) => (item.id ?? item.title) !== (selected.id ?? selected.title))
    : list;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [selectedId]);

  return (
    <>
      <StickyContent showBackLink />
      <main className="project full testimonies-page">
        <div className="header-2">
          <h2 className="italic edo">
            <span className="prom-2">Our </span>Testimonials
          </h2>
        </div>
        {selected && <Card testimony={selected} variant="primary" />}
        {remaining.length > 0 && (
          <div className="testimony-grid">
            {remaining.map((item) => (
              <Card key={item.id ?? item.title} testimony={item} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
