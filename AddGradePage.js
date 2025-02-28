import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import "../style/PageLayout.css";

const AddGradePage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");

  // הבאת רשימת הסטודנטים והקורסים מהשרת
  useEffect(() => {
    api.get("/students").then(response => setStudents(response.data));
    api.get("/courses").then(response => setCourses(response.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // מנקה הודעות קודמות

    // בדיקה שהציון בין 1 ל-100
    if (grade < 1 || grade > 100 || !Number.isInteger(Number(grade))) {
      setMessage("Please enter a grade between 1 and 100, and make sure it's an integer.");
      return;
    }

    // שולח את הבקשה להוספת הציון
    try {
      const response = await api.post("/grades", {
        student_id: selectedStudent,
        course_id: selectedCourse,
        grade: Number(grade), // המרת הציון למספר
      });

      setMessage("Grade added successfully!"); // הודעת הצלחה
      setSelectedStudent(""); // מנקה את השדות
      setSelectedCourse("");
      setGrade("");
    } catch (error) {
      setMessage("Error adding grade. Please check the details."); // הודעת שגיאה
    }
  };

  return (
    <div>
      <h2>Add a Grade</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Select Student:</label>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
          <option value="">-- Choose a Student --</option>
          {students.map((student) => (
            <option key={student.id_number} value={student.id_number}>
              {student.first_name} {student.last_name} ({student.id_number})
            </option>
          ))}
        </select>

        <label>Select Course:</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
          <option value="">-- Choose a Course --</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.name} - {course.lecturer} ({course.year} {course.semester})
            </option>
          ))}
        </select>

        <label>Grade:</label>
        <input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} min="0" max="100" required />

        <button type="submit">Add Grade</button>
      </form>

      <Link to="/students">
        <button>Back to Students</button>
      </Link>
    </div>
  );
};

export default AddGradePage;