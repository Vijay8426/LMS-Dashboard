// src/components/CourseCard.jsx
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

export function CourseCard({ title, description, img, route, buttonText , progress }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="h-full"
    >
      <Card shadow={true} className="flex flex-col h-full rounded-2xl hover:shadow-xl transition-shadow duration-300">
        {/* ✅ Aspect ratio keeps images consistent & responsive */}
        <CardHeader floated={false} color="white" className="aspect-[16/9] overflow-hidden rounded-t-2xl">
          <motion.img
            src={img}
            alt={title}
            className="h-full w-full object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </CardHeader>

        <CardBody className="flex flex-col flex-grow px-4 py-2">
          <Typography variant="h6" color="blue-gray" className="mt-1 mb-2 font-semibold">
            {title}
          </Typography>
          <Typography variant="small" className="font-normal text-blue-gray-500 flex-grow">
            {description}
          </Typography>

          {/* ✅ Optional progress bar */}
          {progress !== undefined && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <Typography variant="small" color="blue-gray" className="mt-1 text-xs font-medium">
                {progress}% Complete
              </Typography>
            </div>
          )}
        </CardBody>

        <CardFooter className="px-4 pb-4">
          {route ? (
            <a href={route} className="w-full">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Button fullWidth variant="gradient" size="sm" color="black">
                  {buttonText}
                </Button>
              </motion.div>
            </a>
          ) : (
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Button fullWidth variant="gradient" size="sm" color="blue-gray">
                {buttonText}
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default CourseCard;
