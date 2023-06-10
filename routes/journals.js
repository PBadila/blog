const express = require("express");
const router = express.Router();

const { Journal } = require('../models')

//Create a new Blog Post
router.post('/', async (req,res) => {
    const { title, entry, link, topic } = req.body;
    try{
        const journal = await Journal.create({ title,entry,link,topic });
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

//Get Blog Post by a specific id
router.get('/:id', async (req,res) => {
    try{
        const journal = await Journal.findByPk(req.params.id)
        if(!journal){
            res.status(404).json({message: 'Blog post not found'})
        } else {
            res.json(journal)
        }
    }catch (error){
        res.status(500).json({message: "Error retrieving blog post", error })
    }
})

module.exports = router;