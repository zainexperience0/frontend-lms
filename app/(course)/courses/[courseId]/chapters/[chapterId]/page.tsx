"use client";

import { Chapter } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface pageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterPageid = ({ params }: pageProps) => {
  const [chapter, setChapter] = useState({} as Chapter);

  useEffect(() => {
    const fetchChapter = axios
      .get(`http://localhost:3001/api/chapters/${params.chapterId}`)
      .then((res) => {
        setChapter(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    fetchChapter;
  }, [params.chapterId]);
  return (
    <div className="flex flex-col max-w-4xl mx-auto pb-20">
      <div className="p-6">
        <div className="aspect-video">
          <video
            width={"100%"}
            height={"100%"}
            src={chapter.videoUrl}
            controls
          />
        </div>
        <div className="p-4 flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">
                {chapter.title}
            </h2>
            <h2 className="text-lg font-semibold text-muted-foreground">
                {chapter.description}
            </h2>
        </div>
      </div>
    </div>
  );
};

export default ChapterPageid;
