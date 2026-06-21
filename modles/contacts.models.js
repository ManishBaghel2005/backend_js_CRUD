import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const userSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:[true, "This Field is Important"],
        trim:true
    },
    last_name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:[true,"This Field is Also Important"],
        unique: true,
        trim:true
    },
    phone:{
        type:String,
        trim:true,
        minlength: [10, 'Phone number kam se kam 10 digits ka hona chahiye!'],
        maxlength: [10, 'Phone number 10 digits se zyada nahi ho sakta!']
    },
    address:{
         type:String,
        trim:true
    }
},{timeStamps:true})

userSchema.plugin(mongoosePaginate)

const user = mongoose.model("User", userSchema);
export default user;