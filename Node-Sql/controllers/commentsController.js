const model = require('../models/commentsModel');


async function createComment(postID, body, email,commentName){
    try{
        return model.createComment(postID, body, email,commentName);
    }catch(err){
        throw err;
    }
}

async function getAllComments(){
    try{
        return model.getAllComments()
    }catch(err){
        throw err;
    }

}

async function getComment(ID){
    try{
        return model.getComment(ID)
    }catch(err){
        throw err;
    }
}

async function deleteComment(ID){
    try {
        const result = await model.deleteComment(ID);
        if (result === false) {
            return false;
        }
        return result;
    } catch(err) {
        throw err;
    }
}

async function updateComment(commentID,postID, body, email,commentName){
    try{
        return model.updateComment(commentID,postID, body, email,commentName)
    }catch(err){
        throw err;
    }
}

module.exports = {createComment, getAllComments, getComment ,deleteComment,updateComment}
