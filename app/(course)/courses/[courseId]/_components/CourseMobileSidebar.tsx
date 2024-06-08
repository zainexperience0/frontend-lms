import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "../../../../(dashboard)/_components/Sidebar"
import { CourseSidebar } from "./CourseSidebar"
import { Course } from "@/types"

interface CourseMobileSidebarProps {
  course: Course
}


export const CourseMobileSidebar = ({ course }: CourseMobileSidebarProps) => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu />
        </SheetTrigger>
        <SheetContent className="p-0" side={"left"}>
            <CourseSidebar course={course}/>
        </SheetContent>
    </Sheet>
  )
}
