const mongoose = require('mongoose');

const CarRent = mongoose.model("CarRent",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    year:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        required:true
    },
    numOfseats:{
        type:Number,
        required:true,
    },
    fuelType:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }
})

const Client = mongoose.model('Client',{
firstname:{
    type:String,
},
lastname:{
    type:String,
},
phonenumber:{
    type:Number,
    required:true,
},
email:{
    type:String,
    unique:true,
},
password:{
    type:String,
},
date:{
    type:Date,
    default:Date.now,
}
})

const Rent = mongoose.model('Rents',{
car:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'CarRent'
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Client'
},
dateOfRent:{
    type:String,
    required:true,
},
timeOfRent:{
    type:String,
    required:true
},
dateOfReturn:{
    type:String,
    required:true,
},
timeOfReturn:{
    type:String,
    required:true,
}
})

module.exports = {CarRent,Client,Rent};