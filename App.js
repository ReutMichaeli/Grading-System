import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import AddStudentPage from "./pages/AddStudentPage";
import CourseDetails from "./pages/CourseDetails";
import AddGradePage from "./pages/AddGradePage";
import AllGradesPage from "./pages/AllGradesPage"; 
import AddCoursePage from './pages/AddCoursePage';


function App() {
  return (
    <Router>
      <nav>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<AddStudentPage />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/add-grade" element={<AddGradePage />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/all-grades" element={<AllGradesPage />} />
        <Route path="/courses/add" element={<AddCoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
