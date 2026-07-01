"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import {
  COLLAPSED_LINK_COUNT,
  propertyTypeLinks,
  seoLinkSections,
} from "@/lib/homeSeoLinks";

const HomeSeoDirectory = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section className="border-y border-gray-200 py-12 md:py-16">
      <Container className="space-y-10">
        <p className="text-center text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Search over thousands of listings including{" "}
          <Link
            href={propertyTypeLinks.apartments.href}
            className="text-brand underline"
          >
            {propertyTypeLinks.apartments.label}
          </Link>
          ,{" "}
          <Link
            href={propertyTypeLinks.villas.href}
            className="text-brand underline"
          >
            {propertyTypeLinks.villas.label}
          </Link>
          ,{" "}
          <Link
            href={propertyTypeLinks.townhouses.href}
            className="text-brand underline"
          >
            {propertyTypeLinks.townhouses.label}
          </Link>
          , and{" "}
          <Link
            href={propertyTypeLinks.penthouses.href}
            className="text-brand underline"
          >
            {propertyTypeLinks.penthouses.label}
          </Link>{" "}
          available for rent and sale. You&apos;ll find your next home, in any
          style you prefer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {seoLinkSections.map((section) => {
            const isCollapsible = section.collapsible;
            const visibleLinks =
              isCollapsible && !expanded
                ? section.links.slice(0, COLLAPSED_LINK_COUNT)
                : section.links;

            const isEmirateSection = section.title === "Rentals by Emirate";

            return (
              <div
                key={section.title}
                className={
                  isEmirateSection
                    ? "sm:col-span-2 lg:col-span-1 lg:border-l lg:border-gray-200 lg:pl-6"
                    : ""
                }
              >
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-4">
                  {section.title}
                </h3>

                {isEmirateSection ? (
                  <div className="grid grid-cols-1 gap-y-2">
                    {visibleLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-brand hover:underline"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {visibleLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-600 hover:text-brand hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {isCollapsible && section.links.length > COLLAPSED_LINK_COUNT && (
                      <li>
                        <button
                          type="button"
                          onClick={() => setExpanded((v) => !v)}
                          className="text-sm text-gray-500 hover:text-brand mt-1"
                        >
                          {expanded ? "− View less" : "− View more"}
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default HomeSeoDirectory;
