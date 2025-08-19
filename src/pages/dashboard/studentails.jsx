import React from "react";
import DataTable from "@/widgets/table/datatable";

// ✅ Example dataset with 20 students
const studentRows = [
  { id: 1,  name: "Alice Johnson",    email: "alice@example.com",    enrolled: "Yes", courses: 3 },
  { id: 2,  name: "Bob Smith",        email: "bob@example.com",      enrolled: "No",  courses: 0 },
  { id: 3,  name: "Charlie Brown",    email: "charlie@example.com",  enrolled: "Yes", courses: 5 },
  { id: 4,  name: "Diana Prince",     email: "diana@example.com",    enrolled: "Yes", courses: 2 },
  { id: 5,  name: "Ethan Hunt",       email: "ethan@example.com",    enrolled: "No",  courses: 0 },
  { id: 6,  name: "Fiona Gallagher",  email: "fiona@example.com",    enrolled: "Yes", courses: 4 },
  { id: 7,  name: "George Miller",    email: "george@example.com",   enrolled: "Yes", courses: 1 },
  { id: 8,  name: "Hannah Williams",  email: "hannah@example.com",   enrolled: "No",  courses: 0 },
  { id: 9,  name: "Ian Curtis",       email: "ian@example.com",      enrolled: "Yes", courses: 6 },
  { id: 10, name: "Jane Foster",      email: "jane@example.com",     enrolled: "Yes", courses: 2 },
  { id: 11, name: "Kevin Durant",     email: "kevin@example.com",    enrolled: "Yes", courses: 4 },
  { id: 12, name: "Laura Palmer",     email: "laura@example.com",    enrolled: "No",  courses: 0 },
  { id: 13, name: "Michael Scott",    email: "michael@example.com",  enrolled: "Yes", courses: 3 },
  { id: 14, name: "Nina Simone",      email: "nina@example.com",     enrolled: "Yes", courses: 5 },
  { id: 15, name: "Oscar Wilde",      email: "oscar@example.com",    enrolled: "No",  courses: 0 },
  { id: 16, name: "Paula Abdul",      email: "paula@example.com",    enrolled: "Yes", courses: 2 },
  { id: 17, name: "Quentin Blake",    email: "quentin@example.com",  enrolled: "Yes", courses: 1 },
  { id: 18, name: "Rachel Green",     email: "rachel@example.com",   enrolled: "Yes", courses: 4 },
  { id: 19, name: "Sam Winchester",   email: "sam@example.com",      enrolled: "No",  courses: 0 },
  { id: 20, name: "Tina Turner",      email: "tina@example.com",     enrolled: "Yes", courses: 3 },
];

const studentColumns = [
  { label: "ID", accessor: "id", bold: true },
  { label: "Name", accessor: "name", bold: true },
  { label: "Email", accessor: "email" },
  { label: "Enrolled", accessor: "enrolled" },
  { label: "Courses", accessor: "courses" },
];

export function StudentDetails({ rows = studentRows }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Student Details
      </h2>
      <DataTable
        columns={studentColumns}
        rows={rows}
        pageSize={5}  // ✅ pagination: 4 pages (5 students per page)
        searchable={true}
      />
    </div>
  );
}

export default StudentDetails;
