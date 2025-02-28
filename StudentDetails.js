import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

function StudentDetails() {
  const { id } = useParams();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    api.get(`/grades/student/${id}`)
      .then(response => setGrades(response.data))
      .catch(error => console.error("Error fetching student grades:", error));
  }, [id]);

  return (
    <div>
      <h2>Student Grades</h2>
      <ul>
        {grades.map((grade, index) => (
          <li key={index}>
            Course ID: {grade.course_id}, Grade: {grade.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDetails;
