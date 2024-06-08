import { SidebarRoutes } from "@/app/(dashboard)/_components/SidebarRoutes";
import { GitBranchPlus, Github, School } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  return (
    <div className="border-r h-full flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6 flex items-center justify-center gap-x-3">
        <School className="h-10 w-10" />
        <h1 className="text-3xl font-extrabold">LMS</h1>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="mt-auto flex items-center justify-center flex-col tracking-tight">
        <Link href="https://github.com/zainexperience0">
        <Github className="h-10 w-10 " />
        </Link>
      <p className="text-center text-muted-foreground p-2 border-b">
       ©Created by zainexperience.All Rights Reserved 2024.
      </p>
      <span className="text-center text-muted-foreground p-2">
        Full Stack Developer at Arloodots Software House
      </span>
      </div>
    </div>
  );
};
