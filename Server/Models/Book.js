const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    //id: { type: GraphQLID }, in mongodb we dont need id right ? generated auto 
    name: String,
    genre: String,
    author_id: String // why it's an integer and we r making it string ?
    //for space saving and for performance reasons (matching keys on strings is slower than matching on integers)
})
module.exports = mongoose.model('Book',Book)
