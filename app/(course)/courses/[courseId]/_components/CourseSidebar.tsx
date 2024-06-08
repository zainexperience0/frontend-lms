"use client";
import { Progress } from "@/components/ui/progress";
import { Chapter, Course } from "@/types";
import { CourseSidebarItem } from "./CourseSidebarItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface CourseSidebarProps {
  course: Course;
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const params = useParams();

  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchCourses = axios
      .get(`http://localhost:3001/api/courses/chapters/${params.courseId}`)
      .then((res) => {
        setChapters(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    fetchCourses;
  }, [params]);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col overflow-y-auto">
        <h1 className="font-semibold">{course.title}</h1>
        <Progress value={(chapters.length / 10) * 100} className="my-2" />
      </div>
      <div className="flex flex-col w-full">
        {chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            courseId={chapter.courseId}
          />
        ))}
      </div>
    </div>
  );
};
