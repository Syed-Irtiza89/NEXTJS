import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;

}
const messageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
export interface UserMessage extends Document {
    username: string;
    password: string;
    email: string;
    verifycode: string;
    verifycodeExpire: Date;
    isVerified: boolean;
    messages: Message[];
}
const UsermessageSchema: Schema<UserMessage> = new Schema({
    username: {
        type: String, required: [true, "Username Is Required"]
        , trim: true, unique: true, minlength: [3, "Username Must Be At Least 3 Characters Long"]
    },
    password: { type: String, required: true },
    email: { type: String, required: true, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please Enter A Valid Email"] },
    verifycode: { type: String, required: true,minlength: [6, "Verification code must be at least 6 characters long"] },
    verifycodeExpire: { type: Date, required: true },
    isVerified: { type: Boolean, default: true },
    messages: [messageSchema]
}); 
const UserMessageModel = mongoose.model<UserMessage>('UserMessage', UsermessageSchema)|| mongoose.model<UserMessage>('UserMessage', UsermessageSchema);
export default UserMessageModel;