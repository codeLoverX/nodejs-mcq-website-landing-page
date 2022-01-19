
// The Abstract Factory Concept

import { UserInterface, UserMongoose } from "../schema/User";

// routes
interface INav {
    name: string, url: string
}

// IProduct
interface User {

    passWord: string;
    signInStatus: string;
    signUpStatus: string;
    userName: string;
    setChildVariablesFromQuery(user: UserInterface): void;
}

class ConcreteUser implements User {

    passWord = "";
    signInStatus = "";
    signUpStatus = "";
    userName = "";

    navs: Array<INav> = [
        { name: "Profile", url: "/home-participant" },
        { name: "Logout", url: "/logout" }
    ]

    getNavs(): Array<INav> { return this.navs }

    setParentVariablesFromQuery(user: UserInterface): void {
        this.passWord = user.passWord
        this.signInStatus = user.signInStatus
        this.userName = user.userName
        this.signUpStatus = user.signUpStatus
    }
    setChildVariablesFromQuery(user: UserInterface): void { };
}

class JudgeUser extends ConcreteUser {

    email: string;
    judjeID: string;
    name: string;

    constructor() {
        super()
        super.navs = [
            ...super.navs,
            { name: "Application Submission", url: "/application-submission" },
        ]
    }

    setChildVariablesFromQuery(user: UserInterface): void {
        this.email = user.email;
        this.judjeID = user._id;
        this.name = user.name;
    };


    toObject() {
        return {
            email: this.email,
            judgeID: this.judjeID,
            name: this.name,
            // more
            passWord: this.passWord,
            signInStatus: this.signInStatus,
            signUpStatus: this.signUpStatus,
            userName: this.userName
        }
    }
}

class OrganizerUser extends ConcreteUser {
    address: string;
    contact: string;
    email: string;
    fullName: string;
    organizerID: string;
    organizerPosition: string;
    constructor() {
        super()
        super.navs = [
            ...super.navs,
            { name: "Application Submission", url: "/application-submission" },
        ]
    }

    setChildVariablesFromQuery(user: UserInterface): void {
        this.address = user.address;
        this.contact = user.contact
        this.email = user.email;
        this.fullName = user.fullName;
        this.organizerID = user._id;
        this.organizerPosition = user.organizerPosition;
    };

    toObject() {
        return {
            email: this.email,
            address: this.email,
            organizerID: this.organizerID,
            organizerPosition: this.organizerPosition,
            contact: this.contact,
            fullName: this.fullName,
            // more
            passWord: this.passWord,
            signInStatus: this.signInStatus,
            signUpStatus: this.signUpStatus,
            userName: this.userName,
        }
    }

}

class ParticipantUser extends ConcreteUser {
    fName: string;
    lName: string;
    PTJType: string;
    staffAddress: string;
    StaffEmail: string;
    staffID: string;
    StaffPhoneNo: string;
    constructor() {
        super()
        super.navs = [
            ...super.navs,
            { name: "Application Submission", url: "/application-submission" },
        ]
    }

    setChildVariablesFromQuery(user: UserInterface): void {
        var chunks = user.name.split(/\s+/);
        var arr = [chunks.shift(), chunks.join(' ')];
        this.fName = arr[0] as string;
        this.lName = arr[1] as string;
        this.PTJType = user.PTJType;
        this.staffAddress = user.staffAddress;
        this.StaffEmail = user.StaffEmail;
        this.StaffPhoneNo = user.StaffPhoneNo;
    };

    toObject() {
        return {
            fName: this.fName,
            lName: this.lName,
            PTJType: this.PTJType,
            staffAddress: this.staffAddress,
            StaffEmail: this.StaffEmail,
            staffID: this.staffID,
            StaffPhoneNo: this.StaffPhoneNo,
            // more
            passWord: this.passWord,
            signInStatus: this.signInStatus,
            signUpStatus: this.signUpStatus,
            userName: this.userName,
        }
    }
}

class Factory {
    static createObject(someProperty: string): User {
        if (someProperty === 'participant') {
            return new ParticipantUser()
        } else if (someProperty === 'judge') {
            return new JudgeUser()
        } else {
            return new OrganizerUser()
        }
    }

    static async getByUserType(usertype: string): Promise<UserInterface> {
        let user = await UserMongoose.findOne({ _id: usertype });
        return user
    }

    static async getByUserNameAndPassword(passWord: string, userName: string): Promise<UserInterface> {
        let user = await UserMongoose.findOne({ userName, passWord })
        return user
    }
}

