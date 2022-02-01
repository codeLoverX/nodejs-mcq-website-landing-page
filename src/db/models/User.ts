import { Schema, model, Document, PopulatedDoc } from 'mongoose';

// not written in the docs but must be written!!!
// ** extends Document **
interface UserInterface extends Document {
    passWord: string;
	signInStatus: string;
	signUpStatus: string;
	userName: string;

    // organizer
	address: string;
	contact: string;
	fullName: string;
	organizerPosition: string;
	email: string;
	
    // judge
	name: string;
    // participant
	fName: string;
	lName: string;
	PTJType: string;
	staffAddress: string;
	StaffEmail: string;
	StaffPhoneNo: string;
	_id: string;

}

const schema = new Schema<UserInterface>({
    passWord: String,
	signInStatus: String,
	signUpStatus: String,
	userName: String,
    // organizer
	address: String,
	contact: String,
	fullName: String,
	organizerPosition: String,
	email: String,
    // judge
	name: String,
    // participant
	fName: String,
	lName: String,
	PTJType: String,
	staffAddress: String,
	StaffEmail: String,
	StaffPhoneNo: String,
	_id: String
})


const UserMongoose = model('User', schema)

export { UserMongoose, UserInterface }
