import { Schema, model, Document, Types, PopulatedDoc } from 'mongoose'
import { taskDate } from '../../helpers/dateFormat';
import { ApplicationInterface } from './Application';


interface EvaluationInterface {
	applicationID: PopulatedDoc<ApplicationInterface>,
	evaluationDateTime: Date;
	judgeID: string;
	markEachElements: number[];
	rank: number;
	result: string;
	TotalMark: number;
	_id: string
}

// not written in the docs but must be written!!!
// ** extends Document **

const EvaluationSchema = new Schema<EvaluationInterface>({
	applicationID: {
        type: String, ref: 'Application'
    },
	evaluationDateTime: {type: Date, get: taskDate},
	judgeID: String,
	markEachElements: [Number],
	rank: Number,
	result: String,
	TotalMark: Number,
	_id: String

},
	// The strict option, (enabled by default), ensures that values passed to our model constructor that were not 
	//  specified in our schema do not get saved to the db.
	{ strict: true }
)


const EvaluationMongoose = model<EvaluationInterface>('Evaluation', EvaluationSchema)

export { EvaluationMongoose, EvaluationInterface }
// exports 'Product' interface


