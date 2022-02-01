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
    fName: "First name",
    lName: "Last name",
    PTJType: "PTJ type",
    staffAddress: "Staff address",
    StaffEmail: "Staff email",
    StaffPhoneNo: "Staff phone number",
}


let competition = {
    description: "Description",
    endDate: "End date",
    invitation: "Invitation link",
    programID: "Program ID",
    programName: "Program name",
    startDate: "Start date",
}

let application = {
    _id: 'Application ID',
    applicationReff: "Application reference",
    applicationID: "Application ID",
    applicationStatus: "Application status",
    staffID: "Staff ID",
    submissionDtae: "Submission date",
    programName: "Program name",
    // Properties
    numberOfLocalVisitors: "Number of local visitors",
    funding: "Funding",
    ratings: "Ratings",
    numberOfForeignVisitors: "Number of foreign visitors",
    // Properties
    createdAt: "Created at",
    updatedAt: "Updated at"
}


let evaluation = {
    applicationID: typeof application,
    evaluationDateTime: "Evaluation date",
    judgeID: "Judge ID",
    markEachElements: "Mark Each Elements",
    rank: "Rank",
    result: "Result",
    TotalMark: "Total marks",
}


function keyRenameObject(object: any, nameOfObject: string) {

    let objectKeyList: any
    switch (nameOfObject) {
        case 'user':
            objectKeyList = user
            break;
        case 'evaluation':
            objectKeyList = evaluation
            break;
        case 'competition':
            objectKeyList = competition
            break;
        case 'application':
            objectKeyList = application
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
        if (typeof object[key] === 'string') {
            try
            {
                let date = new Date( object[key] )
                object[key] = object[key].toLocaleDateString()
            }
            catch {}
        }
    }
    return object
}

export { user, competition, evaluation, application, keyRenameObject }
