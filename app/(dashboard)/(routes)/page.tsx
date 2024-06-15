"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { CoursesList } from "../_components/CoursesList";
import { Course } from "@/types";

export default function Home() {
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/courses/published')
      .then((res) => {
        setData(res.data);
      });
  }, [setData]);

  return (
    <>
      <div className="p-6">
        <CoursesList data={data} />
      </div>
    </>
  );
}
