import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import "../style/PageLayout.css";

function CourseDetails() {
  const { id } = useParams();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    api.get(`/grades/course/${id}`)
      .then(response => setGrades(response.data))
      .catch(error => console.error("Error fetching course grades:", error));
  }, [id]);

  return (
    <div>
      <h2>Course Grades</h2>
      <ul>
        {grades.map((grade, index) => (
          <li key={index}>
            Student ID: {grade.student_id}, Grade: {grade.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
