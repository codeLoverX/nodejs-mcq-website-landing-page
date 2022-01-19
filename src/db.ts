const { connect }= require('mongoose')
import * as dotenv from "dotenv"
dotenv.config({ path: __dirname+ "\\env\\config.env" })

// let connectionString:string = "mongodb+srv://new-user-net-ninja-2016:new-user-net-ninja-2016@cluster0.9xruk.mongodb.net/green-leaf-system"
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
    console.log('Connected to Database') // outputs green text

  }
  catch(err) {
    console.log(err)
    console.log(__dirname+ "\\env\\config.env")
    console.log(connectionString)
    console.log('Failed to connect to Database') // outputs green text
  }

}
export { connectDB }