export interface UserI {
    _id : string;
    name : string;
    username : string;
    password : string;
    email : string;
    phone : string;
    bio : string;
    avatar : string;
    gender : GENDER;
    resetToken? : string;
    resetTokenExpiry? : number;
    createdAt : Date;
    updatedAt : Date;
}

export interface MessageI {
    _id : string;
    senderId : string;
    receiverId : string;
    message : string;
    createdAt : Date;
}

export interface ConversationI {
    _id : string;
    participants : string[];
    messages : MessageI[];
    createdAt : Date;
}

export interface OptI {
    phone : string;
    email : string;
    code : string;
    expTime : number;
    createdAt : Date;
}

export enum GENDER {
    MALE = "male",
    FEMALE = "female"
}