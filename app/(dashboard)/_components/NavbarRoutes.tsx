"use client";

import { ModeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");
  return (
    <>
      {
        !isPlayerPage && !isTeacherPage && (
          <div className="hidden md:block">
            <SearchInput />
          </div>
        )
      }
      <div className="flex gap-x-2 ml-auto items-center">
        {isTeacherPage || isPlayerPage ? (
          <>
            <Link href={"/"}>
              <Button variant={"ghost"} size={"sm"}>
                <LogOut className="h-5 w-5" />
                Exit
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/teacher/courses">
              <Button variant={"ghost"} size={"sm"}>
                Teacher Mode
              </Button>
            </Link>
          </>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
