"use client";

import { FileUpload } from "@/components/FileUpload";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { File, LayoutDashboard, ListChecks, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { ChaptersForm } from "./_components/ChaptersForm";


interface pageProps {
  params: {
    courseId: string;
  };
}



const CoursepageId = ({ params }: pageProps) => {
  const router = useRouter();
  const [isAttachmentEdit, setIsAttachmentEdit] = useState(false);
  const [isImgEdit, setIsImgEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({} as Course);
  const [fields, setFields] = useState({
    title: course?.title,
    description: course?.description,
    imageUrl: course?.imageUrl,
    category: course?.category,
    attachments: course?.attachments,
    isPublished: course?.isPublished,
  });

  const toggleImgEdit = () => {
    setIsImgEdit(!isImgEdit);
  };

  const toggleAttachmentEdit = () => {
    setIsAttachmentEdit(!isAttachmentEdit);
  };

  const togglePublished = () => {
    setFields({ ...fields, isPublished: !fields.isPublished });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/courses/${params.courseId}`
        ).then((res) => res.json());
        setCourse(res);
        setFields({
          title: course?.title,
          description: course?.description,
          imageUrl: course?.imageUrl,
          category: course?.category,
          attachments: course?.attachments,
          isPublished: course?.isPublished,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [
    params.courseId,
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.category,
    course?.attachments,
    course?.isPublished,
  ]);

  const onSubmit = () => {
    console.log(fields);

    setLoading(true);
    axios
      .put(`http://localhost:3001/api/courses/${params.courseId}`, {
        title: fields.title,
        description: fields.description,
        imageUrl: fields.imageUrl,
        category: fields.category,
        attachments: fields.attachments,
        isPublished: fields.isPublished,
      })
      .then((res) => {
        setLoading(false);
        toast.success(`Course updated successfully`);
        router.refresh();
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.category,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-600">
            Complete all fields {completionText}
          </span>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={onSubmit} disabled={loading}>
            Save
          </Button>
          <Button
            onClick={togglePublished}
            disabled={loading}
            variant={course?.isPublished ? "default" : "destructive"}
          >
            {course?.isPublished ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          {/**Title Section */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <Label className="font-semibold">Course Title</Label>
            <Input
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
            />
          </div>

          {/**Description Section */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <Label className="font-semibold">Course Description</Label>
            <Input
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
            />
          </div>
          {/**Image Section */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <div className="flex items-center gap-x-2 justify-between">
              <Label className="font-semibold">Course Image</Label>
              <Button variant="ghost" onClick={toggleImgEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            {isImgEdit ? (
              <>
                <div>
                  <FileUpload
                    endpoint="courseImage"
                    onChange={(url) => setFields({ ...fields, imageUrl: url })}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Image
                    src={course?.imageUrl || fields.imageUrl || ""}
                    alt="course image"
                    width={300}
                    height={300}
                  />
                </div>
              </>
            )}
          </div>
          {/**Category Section */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <Label className="font-semibold">Course Category</Label>
            <Select
              onValueChange={(value) =>
                setFields({ ...fields, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={course?.category || "Select Category"}
                />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className="space-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Chapters</h2>
            </div>
            <ChaptersForm courseId={params.courseId}/>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attacments</h2>
            </div>
            <div className="mt-6 border rounded-md p-4 space-y-3">
              <div className="flex items-center gap-x-2 justify-between">
                <Label className="font-semibold">Course Attachments</Label>
                <Button variant="ghost" onClick={toggleAttachmentEdit}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              {isAttachmentEdit ? (
                <>
                  <div>
                    <FileUpload
                      endpoint="courseAttachment"
                      onChange={(url) =>
                        setFields({ ...fields, attachments: url })
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center p-3 w-full border rounded-md bg-sky-700">
                    <p>{course.attachments || fields.attachments}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursepageId;
