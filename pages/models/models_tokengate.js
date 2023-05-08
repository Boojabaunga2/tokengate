import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(

    "mongodb://127.0.0.1:27017/tokengate", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to mongodb')
    })

// Create Mongoose schema
const formSchema = new mongoose.Schema({
    name:String,
    collectionAddress: String,
    url:String

});

// Create Mongoose model
module.exports = mongoose.models.forms || mongoose.model('forms', formSchema)