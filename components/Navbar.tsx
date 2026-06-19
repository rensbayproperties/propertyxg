"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import siteData from "@/constant/site";
import { cn } from "@/lib/utils";
import PropXgLogo from "./PropXgLogo";
import Container from "./Container";
import useListing from "@/hooks/useListing";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/buy",
    label: "Buy",
  },
  {
    href: "/rent",
    label: "Rent",
  },
  {
    href: "/find-agents",
    label: "Find Agents",
  },
  {
    href: "/new-projects",
    label: "New Projects",
  },
];

const routeList2: RouteProps[] = [
  {
    href: "/dxb-transactions",
    label: "Dubai Transactions",
  },
  {
    href: "/",
    label: "For Agents",
  },
];

const Navbar = ({ className }: { className?: string }) => {
  const { setListType } = useListing()

  const pathname = usePathname();

  const isActive = (href: string) => {
    // Handle home route
    if (href === "/") return pathname === href;

    // Handle Buy and Rent routes with query parameters
    if (href.includes("?ad_type=")) {
      const adType = href.split("ad_type=")[1];
      return (
        pathname.startsWith("/listings") &&
        new URLSearchParams(window.location.search).get("ad_type") === adType
      );
    }

    // Handle other routes
    return pathname.startsWith(href);
  };

  const renderNavLink = (route: RouteProps, i: number) => {
    return (
      <Link
        rel="noreferrer noopener"
        href={route.href}
        key={i}
        className={`font-medium ${isActive(route.href) ? "text-brand" : "opacity-80"
          }`}
      >
        {route.label}
      </Link>
    );
  };

  return (
    <header className={`top-0 w-full bg-white/90 backdrop-blur ${className || ""}`}>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="h-14 md:h-16 md:py-4 w-screen">
          <Container>
            <div className="grid grid-cols-3 md:items-center">
              <div>
                {/* desktop */}
                <nav className="hidden lg:flex gap-4 md:gap-6">
                  {routeList.map((route, i) => renderNavLink(route, i))}
                </nav>
              </div>
              <div className="flex justify-center">
                <NavigationMenuItem>
                  <Link
                    rel="noreferrer noopener"
                    href="/"
                    className="text-purple-700"
                  >
                    <PropXgLogo />
                  </Link>
                </NavigationMenuItem>
              </div>
              <div className="flex items-center justify-end gap-8">
                <nav className="hidden lg:flex gap-4 md:gap-6">
                  {routeList2.map((route, i) => renderNavLink(route, i))}
                </nav>
                <div className="hidden md:flex gap-4 items-center">
                  <div>
                    <Link
                      href={`/signin`}
                      className={cn(buttonVariants({ variant: "brand" }), " shadow-sm")}
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
                {/* mobile */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger>
                      <Menu size={24} />
                    </SheetTrigger>
                    <SheetContent className="z-[99999]">
                      <nav className="flex flex-col gap-4">
                        {routeList.map((route, i) => renderNavLink(route, i))}
                      </nav>
                      <Link
                        rel="noreferrer noopener"
                        href=""
                        target="_blank"
                        className={`border w-full mt-5 ${buttonVariants({
                          variant: "outline",
                        })}`}
                      >
                        Log In
                      </Link>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </Container>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
