const mongoose = require("mongoose");
require("../config/db.config");
let userModel = require('../models/user.model')

userModel
    .insertMany([
        {
            username: 'Lovro',
            email: 'hodak.lovro@gmail.com',
            password: '#Lovro0000'
        },
        {
            username: 'Ross',
            email: 'homaidan.ros@gmail.com',
            password: '#Ross0000'
        }
    ])
    .then(() => {
        console.log('Lovro and Ross inserted data rulez!')
        mongoose.connection.close()
    })
    .catch((err) => {
        console.log('smt went wrong with db connection with bin', err)
    })