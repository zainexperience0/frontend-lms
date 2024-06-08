import { IconBadge } from "@/components/IconBadge"
import { BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CourseCardProps {
    id: string
    title: string
    imageUrl: string
    category: string
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    category
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-md transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                fill
                className="object-cover"
                alt="course"
                src={imageUrl} />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-bold group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                </div>
                <p className="text-xs text-muted-foreground">
                    {category}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <IconBadge size={"sm"} icon={BookOpen}/>
                        <span>
                            10 Lessons
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}
