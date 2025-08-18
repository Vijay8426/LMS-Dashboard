// src/components/CourseCard.jsx
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

export  function CourseCard({ title, description, img, route, buttonText = "Enroll Now" }) {
  return (
    <Card shadow={true} className="flex flex-col h-full rounded-2xl">
      <CardHeader floated={false} color="gray" className="h-40 overflow-hidden rounded-t-2xl">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody className="flex flex-col flex-grow px-4 py-2">
        <Typography variant="h6" color="blue-gray" className="mt-1 mb-2 font-semibold">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-500 flex-grow">
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="px-4 pb-4">
        {route ? (
          <a href={route} className="w-full">
            <Button fullWidth variant="gradient" size="sm" color="black">
              {buttonText}
            </Button>
          </a>
        ) : (
          <Button fullWidth variant="gradient" size="sm" color="blue-gray">
            {buttonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
export default CourseCard;
