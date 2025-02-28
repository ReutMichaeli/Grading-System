import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import "../style/AllGrades.css";

const AllGradesPage = () => {
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/grades").then((response) => setGrades(response.data));
    api.get("/courses").then((response) => setCourses(response.data));
  }, []);

  return (
    <div className="grades-container">
      <h2 className="grades-title">All Grades by Course</h2>
      {courses.map((course) => (
        <div key={course.course_id} className="course-section">
          <h3 className="course-title">
            {course.name} ({course.year} - {course.semester})
          </h3>
          <table className="grades-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades
                .filter((grade) => grade.course_id === course.course_id)
                .map((filteredGrade) => (
                  <tr key={filteredGrade.student_id + filteredGrade.course_id}>
                    <td>{filteredGrade.student_id}</td>
                    <td>{filteredGrade.grade}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="navigation-buttons">
        <Link to="/">
          <button className="custom-button">Back to Home</button>
        </Link>
        
        <Link to="/courses">
          <button className="custom-button">Back to Courses</button>
        </Link>
      </div>
    </div>
  );
};

export default AllGradesPage;
