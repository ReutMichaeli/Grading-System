import { Link } from "react-router-dom";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* תמונה בעיגול מעל הכותרת */}
      <div className="home-image-container">
        <img src="https://images.unsplash.com/photo-1550592704-6c76defa9985?w=120&dpr=2&h=200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Njh8fHN0dWR5fGVufDB8fHx8MTc0MDMzMTUxM3ww&ixlib=rb-4.0.3" alt="Education" />
      </div>

      {/* כותרת גדולה */}
      <h1 className="home-title">Welcome to the Grade Management System</h1>

      {/* תיאור האתר */}
      <p className="home-description">
        Welcome to the official student grading system of <strong>Merily Ben Hamo</strong> and <strong>Reut Michaeli</strong>.
        This system allows you to efficiently manage students, courses, and grades in a structured way.
      </p>

      {/* הצגת האפשרויות עם קוביות קטנות */}
      <div className="home-features">
        <p><span className="checkmark">✔</span> Manage student records and details</p>
        <p><span className="checkmark">✔</span> Browse and update courses</p>
        <p><span className="checkmark">✔</span> Assign and track student grades</p>
        <p><span className="checkmark">✔</span> View student progress and analytics</p>
      </div>

      {/* כפתורים לניווט */}
      <div className="home-buttons">
      {/* Student List */}
      <Link to="/students">
        <button className="custom-button">👤 Student List</button>
      </Link>

      {/* Course List */}
      <Link to="/courses">
        <button className="custom-button">📚 Course List</button>
      </Link>

      {/* Add Grade */}
      <Link to="/add-grade">
        <button className="custom-button">➕ Add Grade</button>
      </Link>

      {/* View All Grades */}
      <Link to="/all-grades">
        <button className="custom-button">📊 View All Grades</button>
      </Link>
    </div>
    </div>
  );
};

export default Home;
