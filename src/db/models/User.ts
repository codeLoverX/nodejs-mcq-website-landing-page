import { Schema, model, Document, PopulatedDoc } from 'mongoose';

// not written in the docs but must be written!!!
// ** extends Document **
interface UserInterface extends Document {
	passWord: String,
	signInStatus: String,
	userName: String,
	address: String,
	email: String,
	name: String,
	// organizer
	contact: String,
	organizerPosition: String,
    // judge
	judgePosition: String,
	// participant
	PTJType: String,
	PTJName: String,
	_id: String

}

const schema = new Schema<UserInterface>({
    passWord: String,
	signInStatus: String,
	userName: String,
	address: String,
	email: String,
	name: String,
	// organizer
	contact: String,
	organizerPosition: String,
    // judge
	judgePosition: String,
	// participant
	PTJType: String,
	PTJName: String,
	_id: String
})


const UserMongoose = model('User', schema)

export { UserMongoose, UserInterface }
