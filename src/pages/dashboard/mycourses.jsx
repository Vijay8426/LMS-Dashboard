import React from "react";
import { availableCoursesData } from "@/data"; // ✅ course catalog
import {CourseCard } from "@/widgets/cards";

export function CoursesGrid() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "student") {
    return <div className="text-center mt-20 text-red-500">Unauthorized</div>;
  }

  return (
    <div className="px-4 pb-4">
      <h2 className="text-blue-gray-700 text-xl font-semibold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {availableCoursesData.map(({ img, title, description, route }) => (
          <CourseCard key={title} title={title} description={description} img={img} route={route} />
        ))}
      </div>
    </div>
  );
}

export default CoursesGrid;
