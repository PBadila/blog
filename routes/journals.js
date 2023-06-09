const express = require("express");
const router = express.Router();

const { Journals } = require('../models')

//Create a new Blog Post
router.post('/', async (req,res) => {
    const { title, entry } = req.body;
    try{
        const journal = await Journals.create({ title,entry });
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog post", error});
    }
})

//Get all Blog Posts
router.get('/', async (req,res) => {
    try{
        const journals = await Journal.findAll();
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving blog posts", error})
    }
})

module.exports = router;