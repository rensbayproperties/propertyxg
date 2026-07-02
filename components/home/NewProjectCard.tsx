import Image from "next/image";
import Link from "next/link";
import type { DxbProject } from "@/types";
import {
  buildProjectLocation,
  buildRegisterInterestUrl,
  formatHandover,
  formatLaunchPrice,
  getProjectImage,
  inferPropertyType,
} from "@/lib/homeNewProjects";

type NewProjectCardProps = {
  project: DxbProject;
};

const NewProjectCard = ({ project }: NewProjectCardProps) => {
  const imageSrc = getProjectImage(project.images);
  const projectUrl = `/off-plan?projectId=${project.id}`;
  const whatsappUrl = buildRegisterInterestUrl(project.project_name_en);

  return (
    <div className="w-[280px] flex-shrink-0 bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col">
      <Link href={projectUrl} className="block relative h-40 bg-zinc-200">
        {imageSrc && <Image
          src={imageSrc}
          alt={project.project_name_en}
          fill
          className="object-cover bg-zinc-200s"
          sizes="280px"
        />}
      </Link>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <Link href={projectUrl}>
            <h3 className="font-bold text-base leading-tight hover:text-brand">
              {project.project_name_en}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">
            {inferPropertyType(project)}
          </p>
        </div>

        <p className="text-xs text-gray-500 flex items-start gap-1 leading-relaxed">
          <i className="bi bi-geo-alt mt-0.5 shrink-0" />
          <span>{buildProjectLocation(project)}</span>
        </p>

        <div className="bg-gray-50 rounded-lg grid grid-cols-2 gap-2 p-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">Launch Price</p>
            <p className="font-semibold text-emerald-700">
              {formatLaunchPrice(project)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Handover</p>
            <p className="font-semibold text-gray-900">
              {formatHandover(project.completion_date)}
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <i className="bi bi-whatsapp text-base" />
          Register Interest
        </a>
      </div>
    </div>
  );
};

export default NewProjectCard;
