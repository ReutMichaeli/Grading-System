import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // השתמש ב-useNavigate במקום useHistory
import { api } from "../services/api";

function AddStudentPage() {
  const [id_number, setIdNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // הוספת שדה להודעות שגיאה
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/students", {
        id_number,
        first_name,
        last_name,
      });

      if (response.status === 201) {
        alert("הסטודנט נוסף בהצלחה!");
        navigate("/students");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      setErrorMessage(error.response?.data?.error || "שגיאה בהוספת הסטודנט."); // הצגת שגיאה אם יש
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID: </label>
          <input
            type="text"
            value={id_number}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* הצגת הודעת שגיאה אם יש */}
    </div>
  );
}

export default AddStudentPage;
