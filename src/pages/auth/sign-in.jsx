import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { studentsData } from "@/data/studentsData"; // mock students DB
import { adminData } from "@/data/adminData";       // mock admin credentials

export function SignIn() {
  // --- Local State ---
  const [email, setEmail] = useState("");     // user input email
  const [password, setPassword] = useState(""); // user input password
  const [role, setRole] = useState("");       // selected role (student/admin/none)
  const [error, setError] = useState("");     // error message display
  const navigate = useNavigate();

  // --- Handle Form Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Admin login flow ---
    if (role === "admin") {
      if (email === adminData.email && password === adminData.password) {
        localStorage.setItem("user", JSON.stringify({ id: adminData.id, role: "admin" }));
        navigate("/dashboard/adminHome");
        return;
      } else {
        setError("Only admin can log in with this role");
        return;
      }
    }

    // --- Student login flow ---
    if (role === "student") {
      const student = Object.values(studentsData).find(
        (s) => s.email === email && s.password === password
      );
      if (student) {
        localStorage.setItem("user", JSON.stringify({ id: student.id, role: "student" }));
        navigate("/dashboard/studentHome");
        return;
      } else {
        setError("Only a student can log in with this role");
        return;
      }
    }

    // --- Default login flow (role not selected) ---
    // Check student first
    const student = Object.values(studentsData).find(
      (s) => s.email === email && s.password === password
    );
    if (student) {
      localStorage.setItem("user", JSON.stringify({ id: student.id, role: "student" }));
      navigate("/dashboard/studentHome");
      return;
    }

    // Check admin next
    if (email === adminData.email && password === adminData.password) {
      localStorage.setItem("user", JSON.stringify({ id: adminData.id, role: "admin" }));
      navigate("/dashboard/adminHome");
      return;
    }

    // If no matches → invalid credentials
    setError("Invalid Email or Password");
  };

  return (
    <section className="m-8 flex gap-4">
      {/* Left Section (Form) */}
      <div className="w-full lg:w-3/5 mt-24">
        {/* Heading */}
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Choose a role to restrict login, or leave blank for normal login.
          </Typography>
        </div>

        {/* Error message */}
        {error && (
          <Typography color="red" className="text-center mt-2">{error}</Typography>
        )}

        {/* Sign In Form */}
        <form 
          onSubmit={handleSubmit} 
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">

            {/* Role Selector */}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Role (optional)
            </Typography>
            <Select
              label="Select role"
              value={role}
              onChange={(value) => setRole(value)}
            >
              <Option value="student">Student</Option>
              <Option value="admin">Admin</Option>
            </Select>

            {/* Email Input */}
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

            {/* Password Input */}
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

          {/* Submit Button */}
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>
        </form>
      </div>

      {/* Right Section (Image) */}
      <div className="w-2/5 h-full hidden lg:block">
        <img 
          src="/img/pattern.png" 
          className="h-full w-full object-cover rounded-3xl" 
          alt="Sign in visual"
        />
      </div>
    </section>
  );
}

export default SignIn;
