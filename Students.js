import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import "../style/PageLayout.css";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Student List</h1>
      <p className="page-description">Here is a list of all students.</p>

      {/* רשימה רגילה במקום קוביות */}
      <ul className="student-list">
        {students.length > 0 ? (
          students.map(student => (
            <li key={student.id} className="student-item">
              {student.first_name} {student.last_name} - {student.id}
            </li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>

      <div className="page-buttons">
        <Link to="/add-student">
          <button className="page-button">➕ Add Student</button>
        </Link>
      </div>

      <Link to="/">
        <button className="back-home-button">🏠 Back to Home</button>
      </Link>
    </div>
  );
};

export default Students;
