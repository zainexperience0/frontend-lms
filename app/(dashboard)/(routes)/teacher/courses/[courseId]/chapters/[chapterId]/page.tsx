"use client";

import { FileUpload } from "@/components/FileUpload";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Chapter } from "@/types";
import axios from "axios";
import { LayoutDashboard, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface pageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = ({ params: { courseId, chapterId } }: pageProps) => {
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState({} as Chapter);
  const [isVideoEdit, setIsVideoEdit] = useState(false);
  const [fields, setFields] = useState({
    title: chapter?.title,
    description: chapter?.description,
    videoUrl: chapter?.videoUrl,
  });

  const toggleVideoEdit = () => {
    setIsVideoEdit(!isVideoEdit);
  };

  useEffect(() => {
    const fetchChapter = axios
      .get(`http://localhost:3001/api/chapter/${chapterId}`)
      .then((res) => {
        console.log(res.data);
        setChapter(res.data);
        setFields({
          title: res.data.title,
          description: res.data.description,
          videoUrl: res.data.videoUrl,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    fetchChapter;
  }, [chapterId])

  const onSubmit = () => {
    console.log(fields);

    setLoading(true);
    axios
      .put(`http://localhost:3001/api/chapter/${chapterId}`, {
        title: fields.title,
        description: fields.description,
        videoUrl: fields.videoUrl,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Chapter updated successfully");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  const requiredFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Chapter Setup</h1>
          <span className="text-sm text-slate-600">
            Complete all fields {completionText}
          </span>
        </div>
        <Button onClick={onSubmit} disabled={loading}>
          Save
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          {/**Title  */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <Label className="font-semibold">Course Title</Label>
            <Input
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
            />
          </div>
          {/**Description  */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <Label className="font-semibold">Course Description</Label>
            <Textarea
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          {/**Video Url  */}
          <div className="mt-6 border rounded-md p-4 space-y-3">
            <div className="flex items-center gap-x-2 justify-between">
              <Label className="font-semibold">Video Url</Label>
              <Button variant="outline" onClick={toggleVideoEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            {isVideoEdit ? (
              <>
                <div>
                  <FileUpload
                    endpoint="chapterVideo"
                    onChange={(url) => setFields({ ...fields, videoUrl: url })}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <video
                    src={chapter?.videoUrl || fields.videoUrl || ""}
                    controls
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
