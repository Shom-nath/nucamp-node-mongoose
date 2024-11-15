const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {});

connect.then(() => {
    console.log('Connected correctly to server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'Test'
    })
    .then(campsite => {
        console.log(campsite);

        return Campsite.findByIdAndUpdate(campsite._id, { $set:{description: 'Updated Test'}}, {new: true});
    })
    .then(campsite => {
        console.log(campsite);

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lovardis'
        });

        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();

    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    })
});