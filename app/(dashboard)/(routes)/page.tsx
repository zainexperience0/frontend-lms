"use client";
import { categories } from "@/lib/constants";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { CoursesList } from "../_components/CoursesList";
import { Course } from "@/types";

export default function Home() {
  const [category, setCategory] = useState<any>();
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/courses/published')
      .then((res) => {
        setData(res.data);
      });
  }, [category, setData]);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <>
              <button
                key={category}
                onClick={() => setCategory(category)}
                className={cn(
                  "py-2 px-3 text-sm border border-slate-200 rounded-full hover:border-sky-700"
                )}
              >
                <div key={category} className="truncate" onClick={() => {}}>
                  {category}
                </div>
              </button>
            </>
          ))}
        </div>
        <CoursesList data={data} />
      </div>
    </>
  );
}
