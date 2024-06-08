"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chapter } from "@/types";
import axios from "axios";
import { Grip, Pencil, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ChaptersFormProps {
  courseId: string;
}

export const ChaptersForm = ({ courseId }: ChaptersFormProps) => {
  const router = useRouter();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };

  useEffect(() => {
    const fetchCourses = axios
      .get(`http://localhost:3001/api/courses/chapters/${courseId}`)
      .then((res) => {
        setChapters(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    fetchCourses;
  }, [courseId]);

  const onSubmit = () => {
    setLoading(true);
    axios
      .post(`http://localhost:3001/api/chapter/create`, {
        title,
        courseId: courseId,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Chapter created successfully");
        console.log(res);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  const onDelete = (id: string) => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/api/chapter/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("Chapter deleted successfully");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="mt-6 border rounded-md p-4 space-y-3">
      <div className="flex items-center gap-x-2 justify-between">
        <Label>Chapters List</Label>
        <Button variant={"ghost"} onClick={toggleAdd}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Chapter
        </Button>
      </div>
      {isAdd && (
        <>
          <div className="flex flex-col items-center gap-y-4">
            <Input
              disabled={loading}
              placeholder="Add Chapter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button disabled={loading} onClick={onSubmit} className="ml-auto">
              Add Chapter
            </Button>
          </div>
        </>
      )}
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="flex items-center gap-x-2 border rounded-md mb-4 text-sm"
        >
          <div className="px-2 py-3 border-r rounded-l-md transition">
            <Grip className="h-4 w-4" />
          </div>
          {chapter.title}
          <div className="ml-auto flex items-center gap-x-2 mr-4">
            <Pencil
              className="h-5 w-5 mr-2 cursor-pointer hover:bg-slate-200"
              onClick={() =>
                router.push(
                  `/teacher/courses/${courseId}/chapters/${chapter.id}`
                )
              }
            />
            <Trash
              className="text-red-500 cursor-pointer h-5 w-5 "
              onClick={() => onDelete(chapter.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
