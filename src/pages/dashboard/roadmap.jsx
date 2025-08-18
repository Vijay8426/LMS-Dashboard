import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

// Hardcoded courses for each domain
const coursesByDomain = {
  "Full Stack": [
    { title: "Full Stack Fundamentals", description: "Overview of full stack concepts.", img: "https://source.unsplash.com/600x400/?fullstack" },
    { title: "Frontend with React", description: "Learn React and modern frontend.", img: "https://source.unsplash.com/600x400/?react" },
    { title: "Backend with Node.js & Express", description: "Server-side logic and APIs.", img: "https://source.unsplash.com/600x400/?nodejs" },
  ],
  Frontend: [
    { title: "HTML & CSS Fundamentals", description: "Learn HTML and CSS.", img: "https://source.unsplash.com/600x400/?html,css" },
    { title: "Responsive Design with Bootstrap", description: "Mobile-first responsive layouts.", img: "https://source.unsplash.com/600x400/?bootstrap" },
    { title: "Modern JavaScript (ES6+)", description: "Master JavaScript ES6+.", img: "https://source.unsplash.com/600x400/?javascript" },
  ],
  Backend: [
    { title: "Backend with Python", description: "Build APIs with Python frameworks.", img: "https://source.unsplash.com/600x400/?python,backend" },
    { title: "Backend with Java", description: "Enterprise backend with Spring Boot.", img: "https://source.unsplash.com/600x400/?java,backend" },
  ],
  "Cyber Security": [
    { title: "Ethical Hacking Fundamentals", description: "Learn penetration testing.", img: "https://source.unsplash.com/600x400/?hacking" },
    { title: "Network Security", description: "Firewalls, VPNs, IDS/IPS.", img: "https://source.unsplash.com/600x400/?network,security" },
    { title: "Cryptography Basics", description: "Encryption, hashing, security.", img: "https://source.unsplash.com/600x400/?cryptography" },
  ],
};

export function Roadmap() {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const domains = [
    { name: "Full Stack", description: "Learn both frontend and backend development with modern stacks." },
    { name: "Frontend", description: "Master HTML, CSS, JavaScript and modern frontend frameworks." },
    { name: "Backend", description: "Build robust server-side applications and APIs." },
    { name: "Cyber Security", description: "Learn ethical hacking, network security, and cryptography." },
  ];

  return (
    <div className="px-4 py-6">
      {/* Domain Cards */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {domains.map((domain) => (
          <Card
            key={domain.name}
            shadow={true}
            className="flex flex-col w-80 p-6 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedDomain(domain.name)}
          >
            <CardBody className="flex flex-col flex-grow px-0 py-0">
              <Typography variant="h6" color="blue-gray" className="mb-2 font-semibold">
                {domain.name}
              </Typography>
              <Typography variant="small" className="text-blue-gray-500">
                {domain.description}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Courses for selected domain */}
      {selectedDomain && (
        <div>
          <Typography variant="h5" color="blue-gray" className="mb-6 text-center">
            {selectedDomain} Courses
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {coursesByDomain[selectedDomain]?.map((course) => (
              <Card key={course.title} shadow={true} className="flex flex-col h-full rounded-2xl">
                <CardHeader floated={false} color="gray" className="h-40 overflow-hidden rounded-t-2xl">
                  <img src={course.img} alt={course.title} className="h-full w-full object-cover" />
                </CardHeader>
                <CardBody className="flex flex-col flex-grow px-4 py-2">
                  <Typography variant="h6" color="blue-gray" className="mt-1 mb-2 font-semibold">
                    {course.title}
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-500 flex-grow">
                    {course.description}
                  </Typography>
                </CardBody>
                <CardFooter className="px-4 pb-4">
                  <Button fullWidth variant="gradient" size="sm" color="blue-gray">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Roadmap;
