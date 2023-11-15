import mongoose from 'mongoose'

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!) // Typescript uyarısını kaldırmak için ünlem kullandık
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.' + err)
            process.exit()
        })
    } catch (err) {
        console.log('Something goes wrong!')
        console.log(err)
    }
}

export default connect