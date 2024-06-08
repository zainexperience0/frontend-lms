"use client";

import { Course } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface pageProps {
  params: {
    courseId: string;
  };
}

const CoursePage = ({ params }: pageProps) => {
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
    <div className="h-full w-full p-6">
      <div className="flex justify-center flex-col max-w-6xl gap-y-8">
        <Image src={course.imageUrl} width={1000} height={300} alt="course" />
        <div>
        <h1 className="text-3xl font-extrabold">{course.title}</h1>
        <p className="text-lg font-semibold">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
