
import React, { useState, useEffect, useMemo } from "react";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { DxbProject } from "@/types";
import { useQueryState } from "nuqs";
import { Icons } from "@/components/icons";
import useDxbProjects from "@/hooks/useDxbProjects";

interface ProjectSearchDropdownProps {
  onLocationSelect: (location: DxbProject) => void;
  defaultValue?: DxbProject;
}

const ProjectSearchDropdown: React.FC<ProjectSearchDropdownProps> = ({
  onLocationSelect,
  defaultValue,
}) => {
  const {
    projects: dt,
    isLoadingProjects: isLoading,
  } = useDxbProjects({ limit: 1000 });


  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [, setName] = useQueryState("title");

  useEffect(() => {
    if (defaultValue) {
      setSearchTerm(
        defaultValue?.project_name_en ||
          defaultValue?.master_project_en ||
          defaultValue?.area_name_en ||
          ""
      );
    }
  }, [defaultValue]);

  const handleProjectSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setSearchTerm(value);
    setName(value);
    setIsOpen(true);
  };

  const projects = dt?.data || [];

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    if (!searchTerm.trim()) return projects;

    return projects.filter((project: DxbProject) => {
      const search = searchTerm.toLowerCase();

      return (
        project?.project_name_en
          ?.toLowerCase()
          .includes(search) ||
        project?.master_project_en
          ?.toLowerCase()
          .includes(search) ||
        project?.area_name_en
          ?.toLowerCase()
          .includes(search) ||
        project?.developer_name_en
          ?.toLowerCase()
          .includes(search)
      );
    });
  }, [projects, searchTerm]);

  if (!Array.isArray(projects) || projects.length <= 0) return <></>;

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search project"
        className="rounded-full"
        value={searchTerm}
        onChange={handleProjectSearch}
        onFocus={() => setIsOpen(true)}
        icon={Icons.buildings}
      />

      {isOpen && searchTerm && (
        <ul className="absolute left-0 top-full bg-white border mt-2 rounded-xl shadow-lg z-[9999] max-h-80 overflow-auto w-full p-2">
          {isLoading ? (
            <li className="p-4 flex justify-center">
              <Loader2 className="animate-spin" />
            </li>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project: DxbProject) => (
              <li
                key={project.id}
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-lg flex gap-2 items-center transition-colors"
                onMouseDown={() => {
                  setSearchTerm(project?.project_name_en || "");
                  setIsOpen(false);
                  onLocationSelect(project);
                }}
              >
                <i className="bi bi-buildings opacity-50 text-lg"></i>

                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {project.project_name_en}
                  </span>

                  {(project.area_name_en ||
                    project.master_project_en) && (
                    <span className="text-xs text-gray-500">
                      {project.area_name_en}
                      {project.area_name_en &&
                        project.master_project_en &&
                        " • "}
                      {project.master_project_en}
                    </span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="p-4 text-sm text-gray-500 text-center">
              No projects found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProjectSearchDropdown;
