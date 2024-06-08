import { Course } from "@/types";
import { CourseCard } from "./CourseCard";

interface CoursesListProps {
  data: Course[];
}

export const CoursesList = ({ data }: CoursesListProps) => {
  return (
    <div className="mt-2">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {data.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl}
            category={course.category}
          />
        ))}
      </div>
    </div>
  );
};
