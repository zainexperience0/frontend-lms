"use client";

import { Course } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourseSidebar } from "./_components/CourseSidebar";
import { CourseNavbar } from "./_components/CourseNavbar";

interface layoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}

const CourseIdlayout = ({ children, params }: layoutProps) => {
  const [course, setCourse] = useState({} as Course);
  useEffect(() => {
    const fetchCourse = async () => {
      axios
        .get(`http://localhost:3001/api/courses/${params.courseId}`)
        .then((res) => {
          setCourse(res.data);
        });
    };
    fetchCourse();
  }, [params.courseId]);
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
      <CourseNavbar
      course={course} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
       <CourseSidebar
       course={course} />
      </div>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
};

export default CourseIdlayout;
