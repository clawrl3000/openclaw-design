"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CartButton } from "@/components/cart-button";

function ClawIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8 2 4 6 4 10C4 12 5 14 7 15L6 20C6 21 7 22 8 22H16C17 22 18 21 18 20L17 15C19 14 20 12 20 10C20 6 16 2 12 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M9 8C9 8 7 4 5 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 8C15 8 17 4 19 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 10C8 10 6 8 4 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 10C16 10 18 8 20 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="14" rx="5" ry="6" fill="currentColor" opacity="0.3" />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4 text-white/30"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function UserMenu({ user }: { user: any }) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform border-white/20 hover:border-white/40"
          color="default"
          name={user.name || user.email}
          size="sm"
          src={user.image}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        classNames={{
          base: "bg-[#110B07] border border-white/10",
          list: "bg-[#110B07]",
        }}
      >
        <DropdownItem
          key="profile"
          className="h-14 gap-2 text-white/80"
          textValue="Profile"
        >
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          className="text-white/80 hover:bg-white/10"
          textValue="Dashboard"
        >
          My Dashboard
        </DropdownItem>
        <DropdownItem
          key="purchases"
          className="text-white/80 hover:bg-white/10"
          textValue="Purchases"
        >
          My Purchases
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-red-400 hover:bg-red-500/10"
          onPress={handleSignOut}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export function SiteNavbar() {
  const { data: session } = useSession();

  return (
    <HeroNavbar
      maxWidth="xl"
      isBlurred
      classNames={{
        base: "bg-[#110B07]/80 border-b border-white/5",
        wrapper: "px-4 sm:px-6",
      }}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2 group">
          <ClawIcon className="text-[#FF4D4D] w-7 h-7 group-hover:text-[#F97316] transition-colors" />
          <span className="font-mono font-bold text-lg tracking-tight text-white">
            OpenClaw
          </span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          {/* Search bar: rounded-full, dark surface, subtle border, magnifying glass icon per spec */}
          <Input
            classNames={{
              base: "max-w-[300px]",
              inputWrapper:
                "bg-[#1E1510] border border-[#2D221C] rounded-full hover:bg-[#1E1510]/80 group-data-[focus=true]:bg-[#1E1510]/80 h-9",
              input: "text-sm text-white/80 placeholder:text-white/40",
            }}
            placeholder="Search skills..."
            size="sm"
            type="search"
            startContent={<SearchIcon />}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link
            href="/#skills"
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
          >
            All Skills
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link
            href="/how-it-works"
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
          >
            How It Works
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link
            href="/learn"
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
          >
            Learn
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link
            href="/community"
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
          >
            Community
          </Link>
        </NavbarItem>
        <NavbarItem>
          <CartButton />
        </NavbarItem>
        <NavbarItem>
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button
              as={Link}
              href="/auth/signin"
              size="sm"
              variant="flat"
              className="font-mono text-sm bg-[#1E1510] text-white/80 hover:bg-[#2D221C] border border-[#2D221C] rounded-lg"
            >
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
}
