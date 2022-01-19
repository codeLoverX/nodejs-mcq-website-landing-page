import { Schema, model, Document,  PopulatedDoc } from 'mongoose'
import { UserInterface } from './User';

interface ApplicationInterface extends Document {
   
	applicationReff: string, 
	applicationStatus: string, 
	staffID:  string,  
    // participant Interface
	submissionDtae: string 
    _id: string,
    //  ojay
    programName: string;

    numberOfLocalVisitors: number,
	funding: number,
	ratings: number,
	numberOfForeignVisitors: number,
    createdAt? : Date,
    updatedAt? : Date
}

const ApplicationSchema = new Schema<ApplicationInterface>({

    staffID: String,
    applicationReff: String, 
	applicationStatus: String, 
	submissionDtae: String,
    _id: String,
    // okay
    programName: String,
    numberOfLocalVisitors: Number,
	funding: Number,
	ratings: Number,
	numberOfForeignVisitors: Number,
},
    // The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
    //  specified in our schema do not get saved to the db.
    { strict: true, timestamps: true }
)


const ApplicationMongoose = model<ApplicationInterface>('Application', ApplicationSchema)

export { ApplicationMongoose, ApplicationInterface }
// exports 'Product' interface


