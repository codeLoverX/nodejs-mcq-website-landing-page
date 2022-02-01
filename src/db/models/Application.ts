import { Schema, model, Document, PopulatedDoc } from 'mongoose'
import { UserInterface } from './User';

interface evaluationPoints {
    numberOfLocalVisitors: number,
    funding: number,
    ratings: number,
    numberOfForeignVisitors: number,
    toilet: string,
    plumbing: string,
    accomodation: string,
    staff: string,
    authority: string,
}

// numberOfLocalVisitors: "Number of local visitors",
// funding: "Funding for the facility",
// ratings: "Rating for the the facility",
// numberOfForeignVisitors: "Number of foreign visitors",
// // 
// toilet: "Quality of toilet (Good/ Very Good/ Excellent)",
// plumbing: "Quality of plumbing (Good/ Very Good/ Excellent)",
// accomodation: "Quality of accomodation (Good/ Very Good/ Excellent)",
// // 
// staff: "Cooperation of staff (Good/ Very Good/ Excellent)",
// authority: "Authority of staff (Good/ Very Good/ Excellent)"

interface ApplicationInterface extends Document {

    applicationReff: string,
    applicationStatus: string,
    staffID: string,
    submissionDtae: Date
    _id: string,
    programName: string;
    evaluationPoints?: evaluationPoints;
    createdAt?: Date,
    updatedAt?: Date
}

const ApplicationSchema = new Schema<ApplicationInterface>({

    staffID: String,
    applicationReff: String,
    applicationStatus: String,
    submissionDtae: Date,
    _id: String,
    evaluationPoints: {
        numberOfLocalVisitors: Number,
        funding: Number,
        ratings: Number,
        numberOfForeignVisitors: Number,
        toilet: String,
        plumbing: String,
        accomodation: String,
        staff: String,
        authority: String,
    },
    programName: String,

},
    // The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
    //  specified in our schema do not get saved to the db.
    { strict: true, timestamps: true }
)


const ApplicationMongoose = model<ApplicationInterface>('Application', ApplicationSchema)

export { ApplicationMongoose, ApplicationInterface }
// exports 'Product' interface


