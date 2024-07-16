import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required:true
  }  ,
  password:{
    type:String,
    required:true
  },
  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link'
  }]
});

export default mongoose.model("users", TaskSchema);
