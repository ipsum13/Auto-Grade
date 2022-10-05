const express = require("express");
const router = express.Router();
require('dotenv').config();

const User = require("../../models/User");
const Student = require("../../models/Student");
const Course = require("../../models/Course");

router.post("/create-course", async (req, res) => {
  const student = req.body.student;
  const user = await User.findById(req.body.faculty);

  Course.findOne({ course_title: req.body.title }).then(course => {
    if (course) {
      return res.status(400).json({ course: "Course already exists" });
    } else {
      const newCourse = new Course({
        course_title: req.body.title,
        section: req.body.section,
        noOfStudents: req.body.noOfStudents,
        faculty: req.body.faculty,
        quiz: req.body.quizPercentage,
        assignment: req.body.assignmentPercentage,
        project: req.body.projectPercentage,
        midterm: req.body.midtermPercentage,
        final: req.body.finalPercentage
      });

      try {
        newCourse.save();
        Student.insertMany(student, (err, res) => {
          if (err) throw err;
        });
        user.courses.push(newCourse);
        user.save();
        res.sendStatus(200);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  });
});


router.put("/add-student", async (req, res) => {
  const id = req.body.id;

 Student.findOne({ id: id, course: req.body.course, section: req.body.section }).then(st => {
    if (st) {
      return res.status(400).json({ course: "Student already exists" });
    } else {
      const student = new Student({
        id: req.body.id,
        name: req.body.name,
        course: req.body.course,
        section: req.body.section,
        faculty: req.body.faculty,
        quizes: req.body.quizes,
        assignments: req.body.assignments,
        project: req.body.project,
        midterm: req.body.midterm,
        final: req.body.final
      })

      try {
       student.save();
        res.sendStatus(200);
      } catch (e) {
        res.status(400).send(e);
      }
    }
  });
});






router.post("/upload-quiz-marks", async (req, res) => {
  const marks = req.body.Quiz;
  const course = req.body.course_title;
  const section = req.body.section;

  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if (student) {
      const newQuiz = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.quizes.push(newQuiz);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/upload-assignment-marks", async (req, res) => {
  const marks = req.body.Assignment;
  const course = req.body.course_title;
  const section = req.body.section;

  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if (student) {
      const newAssignment = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.assignments.push(newAssignment);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/upload-project-marks", async (req, res) => {
  const marks = req.body.Project;
  const course = req.body.course_title;
  const section = req.body.section;

  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if (student) {
      const newProject = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.project.push(newProject);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/upload-midterm-marks", async (req, res) => {
  const marks = req.body.Midterm;
  const course = req.body.course_title;
  const section = req.body.section;

  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if (student) {
      const newMidterm = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.midterm.push(newMidterm);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/upload-final-marks", async (req, res) => {
  const marks = req.body.Final;
  const course = req.body.course_title;
  const section = req.body.section;

  for (let i = 0; i < marks.length; i++) {
    const student_id = marks[i].id;
    const student = await Student.findOne({ id: student_id, course: course, section: section })

    if (student) {
      const newFinal = {
        title: req.body.title,
        marksObtained: marks[i].marksObtained,
        totalMarks: req.body.totalMarks
      }
      try {
        student.final.push(newFinal);
        student.save();
      } catch (e) {
        console.log(e)
      }
    }

  }
  try {
    if (marks) {
      res.sendStatus(200);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});


router.get("/get-courses/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.courses);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-course/:id", async (req, res) => {
  try {
    const course = await Course.findOne(req.params.course);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-quiz-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.query.faculty, section: req.query.section, course: req.query.course });
    const course = await Course.findOne({ course_title: req.query.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }
    let quizes = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        quizes: students[i].quizes
      }
      quizes.push(data)
    }
    if (quizes.length < 1) {
      res.json("No quiz data found for this course!")
    }
    res.json(quizes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.get("/get-assignment-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.query.faculty, section: req.query.section, course: req.query.course });
    const course = await Course.findOne({ course_title: req.query.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let assignments = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        assignments: students[i].assignments
      }
      assignments.push(data)
    }
    if (assignments.length < 1) {
      res.json("No assignment data found for this course or assignment marks has not been uploded yet!")
    }
    res.json(assignments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-project-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.query.faculty, section: req.query.section, course: req.query.course });
    const course = await Course.findOne({ course_title: req.query.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let project = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        project: students[i].project
      }
      project.push(data)
    }
    if (project.length < 1) {
      res.json("No project data found for this course or project marks has not been uploaded yet!")
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-midterm-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.query.faculty, section: req.query.section, course: req.query.course });
    const course = await Course.findOne({ course_title: req.query.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let midterm = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        midterm: students[i].midterm
      }
      midterm.push(data)
    }
    if (midterm.length < 1) {
      res.json("No midterm data found for this course or midterm marks has not been uploaded yet!")
    }
    res.json(midterm);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.get("/get-final-marks", async (req, res) => {
  try {
    const students = await Student.find({ faculty: req.query.faculty, section: req.query.section, course: req.query.course });
    const course = await Course.findOne({ course_title: req.query.course })

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course!' });
    }
    if (!course) {
      return res.status(404).json({ msg: 'Course not found!' });
    }

    let final = [];
    for (let i = 0; i < students.length; i++) {
      let data = {
        id: students[i].id,
        name: students[i].name,
        final: students[i].final
      }
      final.push(data)
    }
    if (final.length < 1) {
      res.json("No final exam data found for this course or final exam marks has not been uploaded yet!")
    }
    res.json(final);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})

router.put("/update-quiz-data", async (req, res) => {
  const students = req.body.student;
  const index = 0;
  

  for (let i = 1; i < students.length; i++) {
    const student = await Student.findOne({ id: students[i].id });
    console.log(student.id);
    if (student) {
      
      // student.updateOne({ $set: { [`midterm.$.totalMarks`]: '100' } }).exec();
    try {
      student.updateOne({ $set: { [`final.${index}.totalMarks`]: "100" } }).exec();
    } catch(e) {
      console.log(e);
    }

    }
  }
})

router.put("/update-quiz", async (req, res) => {
  const id = req.body.id;
  const quiz = req.body.quiz;
  let index;
  if (quiz === "Quiz1") {
    index = 0;
  }
  if (quiz === "Quiz2") {
    index = 1;
  }
  if (quiz === "Quiz3") {
    index = 2;
  }
  if (quiz === "Quiz4") {
    index = 3;
  }
  if (quiz === "Quiz5") {
    index = 4;
  }
  if (quiz === "Quiz6") {
    index = 5;
  }

  const student = await Student.findOne({ id: id, course: req.body.course });
  if (student) {
    try {
      student.updateOne({ $set: { [`quizes.${index}.marksObtained`]: req.body.marks } }).exec();
    } catch(e) {
      console.log(e);
    }
    
  }

})

router.put("/update-assignment", async (req, res) => {
  const id = req.body.id;
  const assignment = req.body.assignment;
  let index;
  if (assignment === "Assignment1") {
    index = 0;
  }
  if (assignment === "Assignment2") {
    index = 1;
  }
  if (assignment === "Assignment3") {
    index = 2;
  }
  if (assignment === "Assignment4") {
    index = 3;
  }
  if (assignment === "Assignment5") {
    index = 4;
  }
  if (assignment === "Assignment6") {
    index = 5;
  }

  const student = await Student.findOne({ id: id, course: req.body.course });
  if (student) {
    student.updateOne({ $set: { [`assignments.${index}.marksObtained`]: req.body.marks } }).exec();
  }

})

router.put("/update-project", async (req, res) => {
  const id = req.body.id;
  const project = req.body.project;
  let index;
  if (project === "Project1") {
    index = 0;
  }
  if (project === "Project2") {
    index = 1;
  }
  if (project === "Project3") {
    index = 2;
  }
  if (project === "Project4") {
    index = 3;
  }
  if (project === "Project5") {
    index = 4;
  }
  if (project === "Project6") {
    index = 5;
  }

  const student = await Student.findOne({ id: id });
  if (student) {
    student.updateOne({ $set: { [`project.${index}.marksObtained`]: req.body.marks } }).exec();
  }

})

router.put("/update-midterm", async (req, res) => {
  const id = req.body.id;
  let index = 0;
  const student = await Student.findOne({ id: id, course: req.body.course });
  if (student) {
    student.updateOne({ $set: { [`midterm.${index}.marksObtained`]: req.body.marks } }).exec();
  }
})

router.put("/update-final", async (req, res) => {
  const id = req.body.id;
  let index = 0;
  const student = await Student.findOne({ id: id, course: req.body.course });
  if (student) {
    student.updateOne({ $set: { [`final.${index}.marksObtained`]: req.body.marks } }).exec();
  }
})


router.get("/generate-grade", async (req, res) => {
  try {
    const students = await Student.find({ course: req.query.course, section: req.query.section, faculty: req.query.faculty });

    const course = await Course.findOne({ course_title: req.query.course });
    const totalQ = course.quiz;
    const totalA = course.assignment;
    const totalP = course.project;
    const totalM = course.midterm;
    const totalF = course.final;

    let totalQuiz;
    let totalAssignment;
    let totalProject;
    let totalMidterm;
    let totalFinal;

    const grade = [];

    for (let i = 0; i < students.length; i++) {
      if (students[i].quizes.length > 0) {
        let marksQ = students[i].quizes.map(item => parseInt(item.marksObtained));
        let totalmQ = students[i].quizes.map(item => parseInt(item.totalMarks));
        let sumQ = marksQ.reduce((a, b) => a + b, 0);
        let totalmSumQ = totalmQ.reduce((a, b) => a + b, 0);
        totalQuiz = ((totalQ * sumQ) / totalmSumQ).toFixed(1);
      } else {
        totalQuiz = 0;
      }


      if (students[i].assignments.length > 0) {
        let marksA = students[i].assignments.map(item => parseInt(item.marksObtained));
        let totalmA = students[i].assignments.map(item => parseInt(item.totalMarks));
        let sumA = marksA.reduce((a, b) => a + b, 0);
        let totalmSumA = totalmA.reduce((a, b) => a + b, 0);
        totalAssignment = ((totalA * sumA) / totalmSumA).toFixed(1);
      } else {
        totalAssignment = 0;
      }


      if (students[i].project.length > 0) {
        let marksP = students[i].project.map(item => parseInt(item.marksObtained));
        let totalmP = students[i].project.map(item => parseInt(item.totalMarks));
        let sumP = marksP.reduce((a, b) => a + b, 0);
        let totalmSumP = totalmP.reduce((a, b) => a + b, 0);
        totalProject = ((totalP * sumP) / totalmSumP).toFixed(1);
      } else {
        totalProject = 0;
      }


      if (students[i].midterm.length > 0) {
        let marksM = students[i].midterm.map(item => parseInt(item.marksObtained));
        let totalmM = students[i].midterm.map(item => parseInt(item.totalMarks));
        let sumM = marksM.reduce((a, b) => a + b, 0);
        let totalmSumM = totalmM.reduce((a, b) => a + b, 0);
        totalMidterm = ((totalM * sumM) / totalmSumM).toFixed(1);
      } else {
        totalMidterm = 0;
      }


      if (students[i].final.length > 0) {
        let marksF = students[i].final.map(item => parseInt(item.marksObtained));
        let totalmF = students[i].final.map(item => parseInt(item.totalMarks));
        let sumF = marksF.reduce((a, b) => a + b, 0);
        let totalmSumF = totalmF.reduce((a, b) => a + b, 0);
        totalFinal = ((totalF * sumF) / totalmSumF).toFixed(1);
      } else {
        totalFinal = 0;
      }

      const item = {
        id: students[i].id,
        name: students[i].name,
        total: parseInt(totalQuiz) + parseInt(totalAssignment) + parseInt(totalProject) + parseInt(totalMidterm) + parseInt(totalFinal)
      }
      grade.push(item)
    }

    if (!students) {
      return res.status(404).json({ msg: 'Students not found for this course' });
    }

    res.json(grade);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
})


module.exports = router;
