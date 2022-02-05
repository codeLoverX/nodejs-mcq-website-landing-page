"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyRenameObject = exports.application = exports.evaluation = exports.competition = exports.user = void 0;
let user = {
    signInStatus: "User Type",
    signUpStatus: "Sign up status",
    userName: "Username",
    // organizer
    address: "Address",
    contact: "Contact",
    fullName: "Full name",
    organizerPosition: "Organizer's position",
    email: "Email",
    // judge
    name: "Name",
    // participant
    PTJType: "PTJ type",
    StaffPhoneNo: "Staff phone number",
};
exports.user = user;
let competition = {
    description: "Description",
    endDate: "End date",
    invitation: "Invitation link",
    programID: "Program ID",
    startDate: "Start date",
};
exports.competition = competition;
let application = {
    _id: 'ID',
    applicationID: "Application ID",
    applicationStatus: "Application status",
    staffName: "Staff Name",
    staffID: "Staff ID",
    staffPTJType: "Staff PTJ Type",
    staffPTJName: "Staff PTJ Name",
    proof: "Proof",
    submissionDtae: "Submission date",
    // Properties
    createdAt: "Created at",
    updatedAt: "Updated at"
};
exports.application = application;
let evaluation = {
    applicationID: typeof application,
    evaluationDateTime: "Evaluation date",
    judgeID: "Judge ID",
    markEachElements: "Mark Each Elements",
    rank: "Rank",
    result: "Result",
    TotalMark: "Total marks",
};
exports.evaluation = evaluation;
function keyRenameObject(object, nameOfObject) {
    let objectKeyList;
    switch (nameOfObject) {
        case 'user':
            objectKeyList = user;
            break;
        case 'evaluation':
            objectKeyList = evaluation;
            break;
        case 'competition':
            objectKeyList = competition;
            break;
        case 'application':
            objectKeyList = application;
            break;
        default:
            break;
    }
    for (var key in object) {
        var keyReplaced = objectKeyList[key];
        // replacing names
        var temp = object[key];
        delete object[key];
        object[keyReplaced] = temp;
        // replacing dates
    }
    console.log({ [nameOfObject]: object });
    return object;
}
exports.keyRenameObject = keyRenameObject;
