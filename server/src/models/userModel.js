const {Schema,model}=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=new Schema({
    name:{
        type:String,
        maxlength:100,
        required:true
    },
    role:{
        type:String,
        maxlength:150,
        default:""
    },
    position:{
        type:String,
        maxlength:150,
        default:""
    },
    phone:{
        type:Number,
        default:null
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        maxlength:200,
        required:true
    },
    refreshToken:{
        token:{
            type:String,
            default:""
        },
        addedAt:{
            type:Date,
            default:Date.now()
        }

    }
},
{
    timestamps:true
})

//model method
//now, User model will have access to findByCredentials() method
userSchema.statics.findByCredentials = async (email,password)=>{
    const user= await User.findOne({email:email})
    if(!user){
            throw new Error("Unable to login")
    }
    const isMatch = await bcrypt.compare(password ,user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

//I don't wanna send sensitive user data like password , refreshTokens ,etc.
userSchema.methods.toJSON = function(){
    //get the mongoose document using this keyword
    const user = this
    //convert the mongoose document to an object by using toObject() method of mongoose
    const userObject=user.toObject()
    //delete password , tokens, version from user object to hide private data of user
    delete userObject.password
    delete userObject.refreshToken
    delete userObject.__v

    return userObject
}

//hashing plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = model("user", userSchema)

module.exports=User