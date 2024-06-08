"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Coursepage = () => {
  const router = useRouter()
  const {user} = useUser()
  
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    setLoading(true);
    axios
      .post("http://localhost:3001/api/courses/create", {
        title,
        userId: user?.id
      })
      .then((res) => {
        setLoading(false);
        toast.success("Course created successfully");
       router.push(`/teacher/courses/${res.data.insertId}`);
        
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-400">
          What would you like to call your course? You can change this later.
        </p>
        <div className="space-y-8 mt-8">
          <div className="space-y-2">
            <Label>Course name</Label>
            <Input
              disabled={loading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="e.g; Introduction to Computer Science"
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Link href={"/teacher/courses"}>
              <Button variant={"ghost"}>Cancel</Button>
            </Link>
            <Button onClick={onSubmit} disabled={loading}>
              {loading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursepage;
