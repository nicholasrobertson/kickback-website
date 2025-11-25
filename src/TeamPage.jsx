import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StickyContent from './components/StickyContent.jsx';
import Footer from './components/Footer.jsx';
import { getContent } from './content/helper.js';

const fallbackTeam = getContent('team');
const deptLabels = {
  board: 'Board',
  team: 'Team',
  volunteers: 'Volunteers',
};
const deptOrder = ['board', 'team', 'volunteers'];

export default function TeamPage() {
  const team = fallbackTeam;

  return (
    <>
      <StickyContent showBackLink />
      <main className="project full team-page">
        <TeamSection members={team} />
      </main>
      <Footer />
    </>
  );
}

function sortTeam(members = []) {
  return [...members].sort((a, b) => {
    const deptA = deptOrder.indexOf(a?.dept ?? '');
    const deptB = deptOrder.indexOf(b?.dept ?? '');
    if (deptA !== deptB) {
      return (deptA === -1 ? Number.MAX_SAFE_INTEGER : deptA) -
        (deptB === -1 ? Number.MAX_SAFE_INTEGER : deptB);
    }
    const orderA = typeof a?.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
    const orderB = typeof b?.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return (a?.name ?? '').localeCompare(b?.name ?? '');
  });
}

function groupTeam(members = []) {
  const buckets = new Map();
  members.forEach((member) => {
    const key = member?.dept ?? 'other';
    const list = buckets.get(key) ?? [];
    list.push(member);
    buckets.set(key, list);
  });

  return Array.from(buckets.entries())
    .map(([dept, people]) => ({
      dept,
      label: deptLabels[dept] ?? dept ?? 'Team',
      members: sortTeam(people),
    }))
    .sort((a, b) => {
      const aIdx = deptOrder.indexOf(a.dept);
      const bIdx = deptOrder.indexOf(b.dept);
      return (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
        (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx);
    });
}

function getPersonKey(person) {
  return person?.id ?? person?.slug ?? person?.name ?? person?.email ?? person?.phone ?? 'member';
}

function getPersonSlug(person) {
  if (person?.slug) return person.slug;
  if (person?.id) return person.id;
  if (person?.name) {
    return person.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  return null;
}

function getPersonPath(person) {
  const slug = getPersonSlug(person);
  return slug ? `/team/${encodeURIComponent(slug)}` : null;
}

function getBioPreview(person, max = 100) {
  const bio = (person?.bio ?? '').trim();
  if (!bio) return '';
  if (bio.length <= max) return bio;
  return `${bio.slice(0, max).trimEnd()}…`;
}

function PeopleCard({ person }) {
  if (!person) {
    return null;
  }
  const navigate = useNavigate();
  const deptLabel = deptLabels[person.dept] ?? person.dept ?? '';
  const socials = Array.isArray(person.social)
    ? [...person.social].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];
  const avatarStyle = person.photo ? { backgroundImage: `url(${person.photo})` } : undefined;
  const detailPath = getPersonPath(person);
  const isNavigable = Boolean(detailPath);

  const handleOpen = (url, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (url) {
      window.open(url, '_blank', 'noreferrer');
    }
  };

  const handleCardActivate = (event) => {
    if (!detailPath) return;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate(detailPath);
  };

  const handleKeyDown = (event) => {
    if (!detailPath) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardActivate(event);
    }
  };

  return (
    <article
      className={`people-card${isNavigable ? ' people-card-link' : ''}`}
      role={isNavigable ? 'button' : undefined}
      tabIndex={isNavigable ? 0 : undefined}
      onClick={isNavigable ? handleCardActivate : undefined}
      onKeyDown={isNavigable ? handleKeyDown : undefined}
    >
      <div className="pc-header">
        <div>
          <div className="edo name">{person.name ?? 'Team member'}</div>
          {(person.role || deptLabel) && (
            <div className="italic prom-2 bold">{person.role ?? deptLabel}</div>
          )}
        </div>
        <div className="avatar-wrapper">
          <div className="avatar" style={avatarStyle}></div>
        </div>
      </div>
      <div className="pc-body">
        {person.email && (
          <div className="pc-email">
            <span className="italic prom-2">e: </span>
            <span className="email" onClick={(event) => handleOpen(`mailto:${person.email}`, event)}>
              {person.email}
            </span>
          </div>
        )}
        {person.phone && (
          <div className="pc-phone">
            <span className="italic prom-2">m: </span>
            <span className="phone" onClick={(event) => handleOpen(`tel:${person.phone}`, event)}>
              {person.phone}
            </span>
          </div>
        )}
        {person.bio && <div className="pc-bio-preview">{person.bio}</div>}
      </div>
      {socials.length > 0 && (
        <div className="socials hundy">
          {socials.map((social) => (
            <div className="soc-item" key={`${person.name}-${social.url ?? social.alt}`}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => handleOpen(social.url, event)}
              >
                <span className="socicon">
                  {social.icon ? <img src={social.icon} alt={social.alt ?? 'social link'} /> : '↗'}
                </span>
              </a>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export function TeamSection({
  sectionId = 'contact',
  members = fallbackTeam,
}) {
  const items = sortTeam(Array.isArray(members) ? members : []);
  const groups = groupTeam(items);
  const hasGroups = groups.length > 0;

  return (
    <section className="people" id={sectionId}>
      {hasGroups ? (
        groups.map((group) => (
          <div className="team-group" key={group.dept}>
            <div className="header-2">
              <h2>
                <span className="italic prom-2">Our </span>
                {group.label}
              </h2>
            </div>
            <div className="people-cards">
              {group.members.map((person) => (
                <PeopleCard
                  key={person.name ?? person.email ?? person.phone ?? Math.random()}
                  person={person}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="reports-empty">No team members available.</p>
      )}
    </section>
  );
}

export function TeamMemberPage({ members = fallbackTeam }) {
  const { memberId } = useParams();
  const list = Array.isArray(members) ? members : [];
  const person =
    list.find((member) => {
      const slug = getPersonSlug(member);
      return slug === memberId || member?.id === memberId;
    }) ?? null;

  const firstName = person?.name ? person.name.split(' ')[0] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [memberId]);

  if (!person) {
    return (
      <>
        <StickyContent showBackLink backLinkTo="/team" />
        <main className="project full team-page">
          <section className="project">
            <div className="header-2">
              <h2 className="italic edo">
                <span className="prom-2">Team </span>Member Not Found
              </h2>
            </div>
            <Link className="btn cool" to="/team">
              Back to team
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const bioHtml =
    person.longBio?.trim() ||
    (person.bio ? person.bio.replace(/\n/g, '<br />') : '<p>Bio coming soon.</p>');
  const personDept = person.dept ?? '';
  const deptLabel = (deptLabels[personDept] ?? personDept) || 'Team';
  const personSlug = getPersonSlug(person);
  const otherMembers = sortTeam(
    list.filter((member) => {
      if (!member) return false;
      if ((member.dept ?? '') !== personDept) return false;
      const memberSlug = getPersonSlug(member);
      const sameId = Boolean(person.id) && member.id === person.id;
      const sameSlug =
        (memberSlug && memberSlug === memberId) || (personSlug && memberSlug === personSlug);
      return member !== person && !sameId && !sameSlug;
    }),
  );

  return (
    <>
      <StickyContent showBackLink backLinkTo="/team" />
      <main className="project full team-page">
        <section className="project">
          <div className="header-2">
            <h2 className="italic edo">
              <span className="prom-2">Meet </span>
              {firstName ?? 'Our Team Member'}
            </h2>
          </div>
          <div className="people-cards">
            <PeopleCard person={person} />
          </div>
          <article className="mission-card team-bio-card">
            <div className="mission-markdown" dangerouslySetInnerHTML={{ __html: bioHtml }} />
          </article>
          {otherMembers.length > 0 && (
            <section className="team-peers">
              <div className="header-2">
                <h2>
                  <span className="italic prom-2">Other </span>
                  {deptLabel}
                </h2>
              </div>
              <div className="people-cards">
                {otherMembers.map((member) => (
                  <PeopleCard key={getPersonKey(member)} person={member} />
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
