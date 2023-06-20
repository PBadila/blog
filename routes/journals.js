const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth")

const { Journal } = require('../models')

//Create a new Blog Post
router.post('/',  async (req,res) => {
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

//Update (replace) a Blog Post by id
router.put('/:id', async (req,res)=> {
    const { title, entry, link, topic } = req.body
    try{
        //newPost is an empty object created to hold the properties to be updated
        const newPost = {}
        //checks to see if each of these attributes are being updated, so if they exist, add them to the newly created object holding the properties to be updated
        if(title !== undefined){
            newPost.title = title
        }
        if(entry !== undefined){
            newPost.entry = entry
        }
        if(link !== undefined){
            newPost.link = link
        }
        if(topic !== undefined){
            newPost.topic = topic
        }
        const [updated] = await Journal.update(newPost, {
            where: {id:req.params.id},
        
        })
        if (updated) {
            const updatedPost = await Journal.findByPk(req.params.id)
            res.json(updatedPost)
        } else{
            res.status(404).json({message: 'Post not found'})
        }
        } catch (error) {
            res.status(500).json({message: "Error updating post", error})
        }
    
})


//Update (add to) a Blog Post by id
router.patch('/:id', async (req,res)=> {
    const { entry, link, date } = req.body
    try{
        //find blog post by id. If it doesn't exist, return error message
        const existPost = await Journal.findByPk(req.params.id)
        if(!existPost){
            return res.status(404).json({message: "Post not found"})
        } 
        //updating properties of existing post 
        existPost.title = existPost.title + ' - Updated'
        if(entry !== undefined){
            existPost.entry = existPost.entry + '\nUpdate:\n' +`(${date}) `+ entry
        }
        if(link !== undefined){
            existPost.link = existPost.link + ', ' + link
        }
        await existPost.save()
        res.json(existPost)
    } catch (error) {
            res.status(500).json({message: "Error updating post", error})
        }
    
})

module.exports = router;