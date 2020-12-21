const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/RossLovro', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('rossLovro DB is connected u fucker u!')
    })
    .catch(e => {
        console.error('Connection error', e.message)
})

