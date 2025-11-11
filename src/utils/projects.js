const defaultProjectTitleClass = 'center italic';

const projectFontClasses = {
  default: defaultProjectTitleClass,
  hyperwave: 'center italic hyperwave boxer',
  edo: 'center italic edo boxer',
  raleway: 'center raleway',
  anton: 'center anton',
  'bebas neue': 'center bebas',
  'bebas nueue': 'center bebas',
  family: 'center family',
};

const legacyProjectTitleClasses = {
  frontdoor: 'center italic edo boxer',
  safetynet: 'center raleway',
  education: 'center bebas',
};

const normalizeFontKey = (value = '') => value.trim().toLowerCase();

export const formatInline = (value = '') =>
  value
    .replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>')
    .replace(/_(.*?)_/g, '<span class="italic">$1</span>')
    .replace(/\n/g, '<br />');

export const parseDescription = (value = '') => {
  if (!value) {
    return { taglineHtml: '', bodyHtml: '' };
  }
  const parts = value.split('\n\n');
  const [first, ...rest] = parts;
  return {
    taglineHtml: formatInline(first?.trim() ?? ''),
    bodyHtml: formatInline(rest.join('\n\n').trim()),
  };
};

export const getProjectTitleClass = (project = {}) => {
  const normalizedFont = normalizeFontKey(project.font ?? '');
  if (normalizedFont && projectFontClasses[normalizedFont]) {
    return projectFontClasses[normalizedFont];
  }
  if (project.id && legacyProjectTitleClasses[project.id]) {
    return legacyProjectTitleClasses[project.id];
  }
  return defaultProjectTitleClass;
};

export const getDescriptionPreview = (value = '', length = 100) => {
  if (!value) {
    return '';
  }
  const cleanText = value
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/[_]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  if (cleanText.length <= length) {
    return cleanText;
  }
  return `${cleanText.slice(0, length).trim()}…`;
};

export const getPrimaryGalleryImage = (project = {}) => {
  const gallery = project.gallery;
  if (Array.isArray(gallery)) {
    for (const block of gallery) {
      if (typeof block === 'string') {
        if (block) {
          return block;
        }
        continue;
      }
      const images = block?.images;
      if (Array.isArray(images) && images.length > 0) {
        return images[0];
      }
    }
  }
  return '';
};
