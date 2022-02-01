"use strict";
class Application {
    constructor() { }
    setProperties(applicationID, applicationReff, applicationStatus, staffID, submissionDte, m_Evaluation) {
        this.applicationID = applicationID;
        this.applicationReff = applicationReff;
        this.applicationStatus = applicationStatus;
        this.staffID = staffID;
        this.submissionDtae = submissionDte;
    }
    getApplicationID() { return this.applicationID; }
    getApplicationReff() { return this.applicationID; }
    getApplicationStatus() { return this.applicationID; }
    getStaffID() { return this.applicationID; }
    getSubmissionDtae() { return this.submissionDtae; }
} //end Application
