"use strict";
// The Abstract Factory Concept
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../schema/User");
class ConcreteUser {
    constructor() {
        this.passWord = "";
        this.signInStatus = "";
        this.signUpStatus = "";
        this.userName = "";
        this.navs = [
            { name: "Profile", url: "/home-participant" },
            { name: "Logout", url: "/logout" }
        ];
    }
    getNavs() { return this.navs; }
    setParentVariablesFromQuery(user) {
        this.passWord = user.passWord;
        this.signInStatus = user.signInStatus;
        this.userName = user.userName;
        this.signUpStatus = user.signUpStatus;
    }
    setChildVariablesFromQuery(user) { }
    ;
}
class JudgeUser extends ConcreteUser {
    constructor() {
        super();
        super.navs = [
            ...super.navs,
            { name: "Application Submission", url: "/application-submission" },
        ];
    }
    setChildVariablesFromQuery(user) {
        this.email = user.email;
        this.judjeID = user._id;
        this.name = user.name;
    }
    ;
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
        };
    }
}
class OrganizerUser extends ConcreteUser {
    constructor() {
        super();
        super.navs = [
            ...super.navs,
            { name: "Application Submission", url: "/application-submission" },
        ];
    }
    setChildVariablesFromQuery(user) {
        this.address = user.address;
        this.contact = user.contact;
        this.email = user.email;
        this.fullName = user.fullName;
        this.organizerID = user._id;
        this.organizerPosition = user.organizerPosition;
    }
    ;
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
        };
    }
}
class ParticipantUser extends ConcreteUser {
    constructor() {
        super();
        super.navs = [
            ...super.navs,
            { name: "Application Submission", url: "/application-submission" },
        ];
    }
    setChildVariablesFromQuery(user) {
        var chunks = user.name.split(/\s+/);
        var arr = [chunks.shift(), chunks.join(' ')];
        this.fName = arr[0];
        this.lName = arr[1];
        this.PTJType = user.PTJType;
        this.staffAddress = user.staffAddress;
        this.StaffEmail = user.StaffEmail;
        this.StaffPhoneNo = user.StaffPhoneNo;
    }
    ;
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
        };
    }
}
class Factory {
    static createObject(someProperty) {
        if (someProperty === 'participant') {
            return new ParticipantUser();
        }
        else if (someProperty === 'judge') {
            return new JudgeUser();
        }
        else {
            return new OrganizerUser();
        }
    }
    static getByUserType(usertype) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.UserMongoose.findOne({ _id: usertype });
            return user;
        });
    }
    static getByUserNameAndPassword(passWord, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.UserMongoose.findOne({ userName, passWord });
            return user;
        });
    }
}
