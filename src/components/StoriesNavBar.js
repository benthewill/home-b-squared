"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import BSquaredLogo from "@/components/BSquaredLogo";
import Image from "next/image";
import Link from "next/link";

export default function StoriesNavBar({ items }) {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      // onMenuOpenChange={setIsMenuOpen}
      className={"bg-transparent"}
    >
      <NavbarContent>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className=" sm:hidden"
          style={{
            color: "#fff",
          }}
        /> */}
        <NavbarBrand>
          <Link href="/" replace>
            <Image
              src="/logo/ben2_logo_white.png"
              alt="B Squared Logo"
              width={20}
              height={20}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="gap-4" justify="center">
        <NavbarItem>
          <Link
            replace
            href="/stories"
            color="secondary"
            className={"text-zinc-100"}
          >
            All Stories
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="secondary" className={"text-zinc-100"} href="#">
            Others
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      {/* <NavbarMenu className="bg-zinc-900 bg-opacity-30">
        <NavbarMenuItem>
          <Link
            replace
            href="/stories"
            color="secondary"
            className={"text-zinc-100"}
          >
            All Stories
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="secondary" className={"text-zinc-100"} href="#">
            Others
          </Link>
        </NavbarMenuItem>
      </NavbarMenu> */}
    </Navbar>
  );
}
