import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { studentsData } from "@/data/studentsData";      // your mock DB
import { adminData } from "@/data/adminData";            // if needed

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  // check students
  const student = Object.values(studentsData).find(
    (s) => s.email === email && s.password === password
  );
  if (student) {
    localStorage.setItem("user", JSON.stringify({ id: student.id, role: "student" }));
    navigate("/dashboard/studentHome");
    window.location.reload();

    return;
  }

  // check single admin
  if (email === adminData.email && password === adminData.password) {
    localStorage.setItem("user", JSON.stringify({ id: adminData.id, role: "admin" }));
     navigate("/dashboard/adminHome");
     window.location.reload();

    return;
  }

  setError("Invalid Email or Password");
};


  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>

        {/* error message */}
        {error && (
          <Typography color="red" className="text-center mt-2">{error}</Typography>
        )}

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          {/* ...Keep rest (checkboxes, google/twitter login, create account link)... */}
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;
