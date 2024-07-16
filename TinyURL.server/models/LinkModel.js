import mongoose from "mongoose";

const ClickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  targetParamValue: {
    type:String,
    default:''//save to this specific click the valuse from URL: 1/2/3
               //  so the user can know from where this click has been done.
  }

});


const LinkSchema = mongoose.Schema({
    originalUrl: {
    type: String,
    required: true,
    default: ''
  },
  clicks: [ClickSchema],
  targetParamName: String,//what appears in URL: t,/tareget/tar...
  targetValues: [
      {
        //sava to this specific link all the values,
        //& names of sites they will be with this code=value
          name: String,
          value: String
      }
  ]

});

export default mongoose.model("links", LinkSchema);
