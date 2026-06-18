import React from "react";
import Container from "./Container";
import siteData from "@/constant/site";
import SectionContainer from "./SectionContainer";
import Link from "next/link";
import { Button } from "./ui/button";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface QuickLink {
  text: string;
  href: string;
}

const Footer = () => {
  const quickLinks: QuickLink[] = [
    { text: "About Us", href: "/about" },
    { text: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="h-[50vh] flex bg-gray-50 z-0">
    </footer>
  );
};

export default Footer;
