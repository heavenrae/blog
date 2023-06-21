const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;

//app.get("/", (req, res) => {
    //res.send("Main");
//});

// Sample initial Q list
let qoutes = [
    {
      id: 1,
      title: "Q1",
    },
    {
      id: 2,
      title: "Q2",
    },
    {
      id: 3,
      title: "Q3",
    },
  ];

app.use(cors());
app.use(express.json());

app.use(express.static('public'));

  
// Get all Q
app.get("/qlist", (req, res) => {
    res.json(qoutes);
});
  
// Create a new book
app.post("/Qadd", (req, res) => {
    const { id, title } = req.body;
  
    // Check if required fields are provided
    if (!id || !title) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
  
    const newQ = { id , title };
    qoutes.push(newQ);
  
    res.status(201).json(newQ);
}); 
  
// Delete a qoute by ID
app.delete("/qdelete", (req, res) => {
    const qouteId = parseInt(req.body.id);
    const index = qoutes.findIndex((qoute) => qoute.id === qouteId);
  
    if (index !== -1) {
      books.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "qoute not found" });
    }
  });


app.listen(port, () => console.log(`listening on port ${port}!`));
