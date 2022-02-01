class Application {

	applicationID: string;
	applicationReff: string;
	applicationStatus: string;
	staffID: string;
	submissionDtae: string;
	constructor() {}

	setProperties(applicationID: string, applicationReff: string, applicationStatus: string, staffID: string, submissionDte: string, m_Evaluation: string) {
		this.applicationID= applicationID;
		this.applicationReff= applicationReff;
		this.applicationStatus= applicationStatus;
		this.staffID= staffID;
		this.submissionDtae= submissionDte;
	}

	getApplicationID(){ return this.applicationID; }
	getApplicationReff(){ return this.applicationID; }
	getApplicationStatus(){ return this.applicationID; }
	getStaffID(){ return this.applicationID; }
	getSubmissionDtae(){ return this.submissionDtae; }


}//end Application
