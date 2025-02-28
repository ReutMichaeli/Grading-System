console.log("Starting server...");

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

// לאפשר לכל הבקשות מכל המקורות
app.use(cors());
app.use(express.json());

// חיבור למסד הנתונים (SQLite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false,
});

// מודל טבלת תלמידים
const Student = sequelize.define("Student", {
  id_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    validate: {
      isNineDigits(value) {
        if (!/^\d{9}$/.test(value)) {
          throw new Error("מספר תעודת הזהות חייב לכלול 9 ספרות");
        }
      },
    },
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
});

// מודל טבלת קורסים
const Course = sequelize.define("Course", {
  course_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  semester: { type: DataTypes.ENUM('A', 'B', 'C'), allowNull: false },
  lecturer: { type: DataTypes.STRING, allowNull: false },
});

// מודל טבלת ציונים
const Grade = sequelize.define("Grade", {
  student_id: {
    type: DataTypes.STRING,
    references: { model: Student, key: "id_number" },
    primaryKey: true,  // חלק מהמפתח הראשי המשולב
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: { model: Course, key: "course_id" },
    primaryKey: true,  // חלק מהמפתח הראשי המשולב
  },
  grade: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
});


// יצירת קשרים בין הטבלאות
Student.belongsToMany(Course, { through: Grade, foreignKey: "student_id" });
Course.belongsToMany(Student, { through: Grade, foreignKey: "course_id" });

// סנכרון מסד הנתונים והפעלת השרת
sequelize.sync().then(() => {
  console.log("Database schema updated successfully!");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error("Error syncing database:", error);
});

// 🔹 מסלולים עבור תלמידים
app.get("/students", async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

app.post("/students", async (req, res) => {
  try {
    const { id_number, first_name, last_name } = req.body;
    if (!/^\d{9}$/.test(id_number)) {
      return res.status(400).json({ error: "ID number must be 9 digits" });
    }
    const newStudent = await Student.create({ id_number, first_name, last_name });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "שגיאה ביצירת תלמיד", details: error.message });
  }
});

app.get("/students/:id", async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});


// 🔹 מסלולים עבור קורסים
app.get("/courses", async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
});


app.put("/courses/:id", async (req, res) => {
  const updated = await Course.update(req.body, { where: { course_id: req.params.id } });
  if (updated[0] === 0) return res.status(404).json({ error: "Course not found" });
  res.json({ message: "Course updated" });
});

app.post("/courses", async (req, res) => {
  try {
    const { name, year, semester, lecturer } = req.body;
    if (!name || !year || !semester || !lecturer) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newCourse = await Course.create({ name, year, semester, lecturer });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Error creating course", details: error.message });
  }
});

// 🔹 מסלולים עבור ציונים
app.get("/grades", async (req, res) => {
  try {
      const grades = await Grade.findAll();
      res.json(grades);
  } catch (error) {
      console.error("Error fetching grades:", error);
      res.status(500).json({ error: "Failed to fetch grades", details: error.message });
  }
});



app.get("/grades/student/:student_id", async (req, res) => {
  const grades = await Grade.findAll({ where: { student_id: req.params.student_id } });
  res.json(grades);
});

app.put("/grades/:student_id/:course_id", async (req, res) => {
  const updated = await Grade.update(req.body, { where: { student_id: req.params.student_id, course_id: req.params.course_id } });
  if (updated[0] === 0) return res.status(404).json({ error: "Grade not found" });
  res.json({ message: "Grade updated" });
});

app.delete("/grades/:student_id/:course_id", async (req, res) => {
  const deleted = await Grade.destroy({ where: { student_id: req.params.student_id, course_id: req.params.course_id } });
  if (deleted === 0) return res.status(404).json({ error: "Grade not found" });
  res.json({ message: "Grade deleted" });
});

app.post("/grades", async (req, res) => {
  const { student_id, course_id, grade } = req.body;

  try {
    if (!student_id || !course_id || grade === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (isNaN(grade) || grade < 0 || grade > 100) {
      return res.status(400).json({ error: "Grade must be a whole number between 0 and 100" });
    }

    console.log("📥 Received data:", { student_id, course_id, grade });

    const [updatedGrade, created] = await Grade.upsert({
      student_id,
      course_id,
      grade,
    });

    console.log("Grade added/updated successfully!");

    res.status(created ? 201 : 200).json({
      message: created ? "Grade added successfully!" : "Grade updated successfully!",
      grade: updatedGrade,
    });

  } catch (error) {
    console.error("Error adding or updating grade:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});



app.get("/", (req, res) => {
  res.send("מערכת ניהול ציונים פועלת עם SQLite!");
});
