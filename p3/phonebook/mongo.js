const mongoose = require('mongoose')

const url = `mongodb+srv://admin:${process.argv[2]}@cluster0.ty3uuu8.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const Person = mongoose.model('Person', new mongoose.Schema({
    name: String,
    number: Number,
}))

switch (process.argv.length) {
    case 3:
        Person.find().then(res => res.forEach(p => console.log(`${p.name} ${p.number}`))).then(res => mongoose.connection.close())
        break
    case 5:
        new Person({
            name: process.argv[3],
            number: process.argv[4],
        }).save().then(result => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        })
        break
    default:
        console.log('error')
        mongoose.connection.close()
        break
        
}


