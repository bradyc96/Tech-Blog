const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User,{
    forignKey: 'user_id',
    onDelete:"CASCADE"
})
Post.hasMany(Comment, {
    forignKey: 'post_id',
    onDelete:"CASCADE"
})

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})


User.hasMany(Comment, {
})


User.hasMany(Post, {

})

Comment.belongsTo(Post, {
    
})

module.exports = {
    User,
    Post,
    Comment
}