const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentSchema = new Schema({
    description: String,
    date: Date,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    
    });

var Coment = mongoose.model("Coment", comentSchema);
module.exports = Coment;