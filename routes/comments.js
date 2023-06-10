const express = require("express");
const router = express.Router();


const { Comment } = require('../models')

//Create a new comment
router.post('/', async (req,res) => {
    const { message, name, blogID } = req.body;
    try{
        const comment = await Comment.create({ message, name, blogID });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error});
    }
})

//Get all Comments
router.get('/', async (req,res) => {
    try{
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving comments", error})
    }
})

//Get Comments for a specific Post using blogID
router.get('/:id', async (req,res) => {
    try{
        const comments = await Comment.findAll({
            where:{
                blogID: req.params.id
            }
        })
        if(!comments){
            res.status(404).json({message: 'No comments for this post'})
        } else {
            res.json(comments)
        }
    }catch (error){
        res.status(500).json({message: "Error retrieving comments", error })
    }
})

module.exports = router;