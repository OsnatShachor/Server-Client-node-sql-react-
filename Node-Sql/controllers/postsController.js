const model = require('../models/postsModel');

async function createPost(userID, title, body){
    try{
        return model.createPost(userID, title, body);
    }catch(err){
        throw err;
    }
}

async function getAllPosts(){
    try{
        return model.getAllPosts()
       
    }catch(err){
        throw err;
    }
}

async function getPost(ID){
    try{
        return model.getPost(ID)
    }catch(err){
        throw err;
    }
}

async function getPostByUser(userID){
    try{
        return model.getPostByUser(userID)
    }catch(err){
        throw err;
    }
}

async function deletePost(ID){
    try{
        return model.deletePost(ID)
    }catch(err){
        throw err;
    }
}
async function updatePost(postID,userID, title, body){
    try{
        return model.updatePost(postID,userID, title, body)
    }catch(err){
        throw err;
    }
}

module.exports = {createPost, getAllPosts, getPost ,deletePost,updatePost,getPostByUser}