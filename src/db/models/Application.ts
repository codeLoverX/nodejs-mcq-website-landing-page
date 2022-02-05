import { Schema, model, Document, PopulatedDoc } from 'mongoose'
import { UserInterface } from './User';

interface evaluationPoints {
    numberOfLocalVisitors: string,
    funding: string,
    ratings: string,
    numberOfForeignVisitors: string,
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
    staffPTJName: string,
    applicationStatus: string,
    staffName: string,
    staffPTJType: string,
    submissionDtae: Date,
    staffID?: String,
    _id: string,
    evaluationPoints?: evaluationPoints;
    createdAt?: Date,
    updatedAt?: Date,
    proof: String
}

const ApplicationSchema = new Schema<ApplicationInterface>({

    staffID: String,
    staffPTJName: String,
    applicationStatus: String,
    submissionDtae: Date,
    staffName: String,
    staffPTJType: String,
    _id: String,
    evaluationPoints: {
        numberOfLocalVisitors: String,
        funding: String,
        ratings: String,
        numberOfForeignVisitors: String,
        toilet: String,
        plumbing: String,
        accomodation: String,
        staff: String,
        authority: String,
    },
    proof: String
},
    // The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
    //  specified in our schema do not get saved to the db.
    { strict: true, timestamps: true }
)


const ApplicationMongoose = model<ApplicationInterface>('Application', ApplicationSchema)

export { ApplicationMongoose, ApplicationInterface }
// exports 'Product' interface


