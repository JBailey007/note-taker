const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Defines where the get route will point
router.get('/api/notes', async (req, res) => {
    const dataJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dataJson);
});

//Defines where the post route will point
router.post('/api/notes', (req, res) => {
    const dataJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dataJson.push(newFeedback);
    fs.writeFileSync("db/db.json",JSON.stringify(dataJson));
    res.json(dataJson);
});
//Defines what the delete route will do
router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes))
    res.json("Note deleted.");
});

module.exports = router;