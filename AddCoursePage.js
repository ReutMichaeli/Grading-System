import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../style/PageLayout.css";

const AddCoursePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [semester, setSemester] = useState("A");
  const [lecturer, setLecturer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && year >= new Date().getFullYear() && year.toString().length === 4 && semester && lecturer) {
      try {
        // Fetch current courses to determine the next course_id
        const coursesResponse = await api.get("/courses");
        const courses = coursesResponse.data;
        const nextCourseId = courses.length > 0 
          ? Math.max(...courses.map(course => course.course_id)) + 1
          : 1;

        // Create the new course with auto-incremented course_id
        await api.post("/courses", { name, year, semester, lecturer, course_id: nextCourseId });
        alert("Course added successfully!");
        navigate("/courses");
      } catch (error) {
        alert("Error adding course: " + error.message);
        console.error(error);
      }
    } else {
      alert("Year must be four digits and at least the current year.");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Add New Course</h1>
      <form className="page-content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Academic Year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
          min={new Date().getFullYear()}
        />
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="A">Semester A</option>
          <option value="B">Semester B</option>
          <option value="C">Semester C</option>
        </select>
        <input
          type="text"
          placeholder="Lecturer's Name"
          value={lecturer}
          onChange={(e) => setLecturer(e.target.value)}
        />

        <button className="page-button" type="submit">
          ➕ Add Course
        </button>

        <button className="back-home-button" type="button" onClick={() => navigate("/courses")}>
          🔙 Back to Courses
        </button>
      </form>
    </div>
  );
};

export default AddCoursePage;
