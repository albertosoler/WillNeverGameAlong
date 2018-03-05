const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/User");

const EventSchema = new Schema(
  { 
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    deporte: String,
    img:String,
    description: String,
    location: {
      lat: String,
      lng: String
  },
    maxPart: Number,
    date: String,
    coment_id:[{
      type:Schema.Types.ObjectId,
      ref: "Comentario"
    }],
    participantes: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    
    }],

  },
  
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
