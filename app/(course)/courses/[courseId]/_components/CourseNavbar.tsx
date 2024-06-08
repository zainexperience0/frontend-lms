'use client'

import { NavbarRoutes } from "@/app/(dashboard)/_components/NavbarRoutes"
import { Course } from "@/types"
import { CourseMobileSidebar } from "./CourseMobileSidebar"

interface CourseNavbarProps {
    course: Course
}
export const CourseNavbar = ({ course }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm">
        <CourseMobileSidebar course={course} />
        <NavbarRoutes />
    </div>
  )
}
