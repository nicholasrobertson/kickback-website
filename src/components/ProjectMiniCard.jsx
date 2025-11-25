import { Link } from 'react-router-dom';
import {
  getProjectTitleClass,
  getDescriptionPreview,
  getPrimaryGalleryImage,
} from '../utils/projects.js';

const placeholderImage = '/images/header-placeholder.jpg';

export function ProjectMiniCard({ project }) {
  if (!project) {
    return null;
  }

  const projectId = project.id ?? project.slug ?? project.title ?? 'project';
  const titleText = project.title ?? projectId;
  const titleClass = getProjectTitleClass(project);
  const preview = getDescriptionPreview(project.description ?? '', 100);
  const imageSrc =
    project.banner || getPrimaryGalleryImage(project) || placeholderImage;

  return (
    <Link to={`/projects/${projectId}`} className="project-card project-card--mini">
      <div className="project-thumb">
        <img src={imageSrc} alt={`${titleText} banner`} />
      </div>
      <div className="project-card-mini-text" >
      <h3 className={titleClass}>{titleText}</h3>
      </div>
      {/*preview && <p className="project-preview">{preview}</p>*/}
    </Link>
  );
}
