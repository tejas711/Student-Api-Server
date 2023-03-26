const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
const students = require('./InitialData');

app.get('/api/student', async (req, res) => {
    try {
      res.status(200).json(students);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  app.get('/api/student/:id', async (req, res) => {
    try {
      const student = students.find((s) => s.id === parseInt(req.params.id));
      if (!student) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).json(student);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  app.post('/api/student', async (req, res) => {
    try {
      const { name, currentClass, division } = req.body;
      if (!name || !currentClass || !division) {
        res.status(400).send('Incomplete student details');
      } else {
        const newStudent = {
          id: students.length + 1,
          name: name,
          currentClass: currentClass,
          division: division,
        };
        students.push(newStudent);
        res.status(201).json({ id: newStudent.id });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  app.put('/api/student/:id', async (req, res) => {
    try {
      const student = students.find((s) => s.id === parseInt(req.params.id));
      if (!student) {
        res.status(400).send('Student not found');
      } else {
        const { name } = req.body;
        if (!name) {
          res.status(400).send('Invalid student details');
        } else {
          student.name = name;
          res.status(200).send('Student updated successfully');
        }
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  app.delete('/api/student/:id', async (req, res) => {
    try {
      const student = students.find((s) => s.id === (req.params.id));
      if (!student) {
        res.status(404).send('Student not found');
      } else {
        students = students.filter((s) => s.id !== student.id);
        res.status(200).send('Student removed successfully');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  })



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   