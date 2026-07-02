"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import NewProjectCard from "@/components/home/NewProjectCard";
import useHomeNewProjects from "@/hooks/useHomeNewProjects";
import {
  EMIRATE_TABS,
  type EmirateId,
} from "@/lib/homeNewProjects";
import { cn } from "@/lib/utils";

const SKELETON_COUNT = 4;

const ProjectCardSkeleton = () => (
  <div className="w-[280px] flex-shrink-0 bg-white rounded-xl border shadow-sm overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-16 bg-gray-100 rounded-lg" />
      <div className="h-10 bg-gray-100 rounded-lg" />
    </div>
  </div>
);

const HomeNewProjectsSection = () => {
  const [activeEmirate, setActiveEmirate] = useState<EmirateId>("dubai");
  const carouselRef = useRef<HTMLDivElement>(null);
  const { projects, isLoading, isError, refetch, isApiEnabled } =
    useHomeNewProjects(activeEmirate);

  const activeTab = EMIRATE_TABS.find((tab) => tab.id === activeEmirate);

  const scrollCarousel = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }, []);

  return (
    <Section>
      <Container className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Browse New Projects in UAE
        </h2>

        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 border rounded-full bg-white">
            {EMIRATE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveEmirate(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
                  activeEmirate === tab.id
                    ? "bg-emerald-50 border border-emerald-500 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 border border-transparent",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {isApiEnabled && !isLoading && projects.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div
            className="relative"
            style={{
              maskImage:
                isApiEnabled && projects.length > 0
                  ? "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)"
                  : undefined,
              WebkitMaskImage:
                isApiEnabled && projects.length > 0
                  ? "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)"
                  : undefined,
            }}
          >
            {!isApiEnabled && (
              <div className="py-16 text-center text-gray-500">
                New projects in {activeTab?.label} coming soon
              </div>
            )}

            {isApiEnabled && isLoading && (
              <div className="flex gap-4 overflow-hidden px-2">
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            )}

            {isApiEnabled && isError && (
              <div className="py-16 text-center space-y-3">
                <p className="text-gray-500">Could not load projects.</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="text-sm text-brand hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {isApiEnabled && !isLoading && !isError && projects.length === 0 && (
              <div className="py-16 text-center text-gray-500">
                No projects available in {activeTab?.label} right now
              </div>
            )}

            {isApiEnabled && !isLoading && !isError && projects.length > 0 && (
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-2 md:px-10 pb-2 scrollbar-hide"
              >
                {projects.map((project) => (
                  <NewProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </div>

        {isApiEnabled && (
          <div className="flex justify-center pt-2">
            <Link
              href="/off-plan"
              className="inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              View all projects in {activeTab?.label} &gt;
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default HomeNewProjectsSection;
