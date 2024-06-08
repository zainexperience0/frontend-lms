"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./_components/Columns";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/courses/all").then((res) => {
      setCourses(res.data);
    });
  }, [setCourses]);
  return (
    <div className="p-6 flex flex-col justify-between">
      <Link href={"/teacher/create"} className="ml-auto">
        <Button>Create</Button>
      </Link>
      <DataTable columns={columns} data={courses} searchKey="title" />
    </div>
  );
};

export default CoursesPage;
