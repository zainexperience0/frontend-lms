'use client'

import { BarChart, Layout, List, Search } from "lucide-react"
import { Sidebaritem } from "./Sidebaritem"
import { usePathname } from "next/navigation"


const guestRoutes = [
  { name: 'Dashboard', href: '/', icon: Layout },
]

const teacherRoutes = [
  { name: 'Courses', href: '/teacher/courses', icon: List },
  { name: 'Analytics', href: '/teacher/analytics', icon: BarChart },
]
export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <Sidebaritem 
        key={route.name}
        icon={route.icon}
        label={route.name}
        href={route.href} />
      ))}
    </div>
  )
}
