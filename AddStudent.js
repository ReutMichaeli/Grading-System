import { useState } from "react";
import { api } from "../services/api";

const AddStudent = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({ id_number: "", first_name: "", last_name: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/students", student);
      setMessage("Student added successfully!");
      setStudent({ id_number: "", first_name: "", last_name: "" });

      if (onStudentAdded) {
        onStudentAdded(); // עדכון רשימת הסטודנטים ב-Students.js
      }
    } catch (error) {
      setMessage("Error adding student. Please check the details.");
    }
  };

  return (
    <div>
      <h3>Add New Student</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>ID Number:</label>
        <input type="text" name="id_number" value={student.id_number} onChange={handleChange} required />

        <label>First Name:</label>
        <input type="text" name="first_name" value={student.first_name} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="last_name" value={student.last_name} onChange={handleChange} required />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
