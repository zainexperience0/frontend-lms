"use client";

import { cn } from "@/lib/utils";
import { Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
}

export const CourseSidebarItem = ({
  id,
  label,
  courseId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname.includes(`/chapters/${id}`);
  const Icon = isActive ? PlayCircle : Lock;
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-emerald-700-700")}
        />
        {label}
      </div>
      <div
      className={cn('ml-auto opacity-0 border-2 border-slate-700 h-full transition-all',
        isActive && 'opacity-100'
      )}
      />
    </button>
  );
};
