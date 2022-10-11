var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blog_db_schema = new Schema({
    username: { type: String, required: true },
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    content:{type:String, required:true},
    date: { type: String, required: true },
    unique_id: { type: String, required:true }
},{
    timestamps: true,
    collection: 'blog-data'
});

var User_blogs = mongoose.model(' ',blog_db_schema);

module.exports = User_blogs