// const mongoose = require('mongoose')
const colors = require('colors')
const userList = require('./users.js')
const User = require('../models/user.model')
const connectToDatabase = require('../config/mongoose.config')

connectToDatabase()

const importData = async () => {
    try {
        await User.deleteMany()

        const createdUsers = await User.insertMany(userList)
        // const adminUser = createdUsers[0]._id
        // const sampleProducts = products.map((product) => {
        //   return { ...product, user: adminUser }
        // })
        // await Product.insertMany(sampleProducts)

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
