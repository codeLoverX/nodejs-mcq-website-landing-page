const { connect }= require('mongoose')
const { join }= require('path')
const dotenv =  require("dotenv")
const path =join(__dirname, '../env/config.env')
dotenv.config({ path })

let connectionString : string = process.env.DB_CONNECTION as any as string
async function connectDB(): Promise<void> {
  try {
    await connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // Note that mongoose will **not** pull `bufferCommands` from the query string
    })

  }
  catch(err) {
     // outputs green text
  }

}
export { connectDB }