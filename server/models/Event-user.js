const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventUserSchema = new Schema(
  {
    
   
    eventId: {
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }
,
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const EventUser = mongoose.model("EventUser", EventUserSchema);

module.exports = EventUser;