import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import "../style/PageLayout.css";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("A");
  const [lecturer, setLecturer] = useState("");

  useEffect(() => {
    api.get("/courses")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (name && year && semester && lecturer) {
      try {
        const response = await api.post('/courses', { name, year, semester, lecturer });
        setCourses([...courses, response.data]);
        setName("");
        setYear("");
        setSemester("A");
        setLecturer("");
      } catch (error) {
        alert("Error adding course: " + error.message);
        console.error(error);
      }
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Course List</h1>
      <p className="page-description">Here is a list of all available courses.</p>

      {courses.length > 0 ? (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.course_id} className="course-item">
              {course.name} ({course.year} - Semester {course.semester}) - Lecturer: {course.lecturer}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found.</p>
      )}

      <div className="page-buttons">
      <Link to="/courses/add">
        <button className="page-button">➕ Add New Course</button>
      </Link>
      </div>

      <Link to="/">
        <button className="back-home-button">🏠 Back to Home</button>
      </Link>
    </div>
  );
};

export default CoursesPage;
