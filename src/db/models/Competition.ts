import { Schema, model, Document, Types } from 'mongoose'
import { taskDate } from '../../helpers/dateFormat'


interface CompetitionInterface {
	description: string;
	endDate: Date;
	invitation: string;
	programID: string;
	programName: string;
	startDate: Date;
	_id: string
}

// not written in the docs but must be written!!!
// ** extends Document **

const CompetitionSchema = new Schema<CompetitionInterface>({
	description: String,
	endDate: {type: Date, get: taskDate},
	invitation: String,
	programID: String,
	programName: String,
	startDate: {type: Date, get: taskDate},
	

	_id: String
},
	// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
	//  specified in our schema do not get saved to the db.
	{ strict: true }
)


const CompetitionMongoose = model<CompetitionInterface>('Competition', CompetitionSchema)

export { CompetitionMongoose, CompetitionInterface }
// exports 'Product' interface


