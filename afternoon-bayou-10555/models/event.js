const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  paidEntry: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

eventSchema.method("toClient", function() {
  const event = this.toObject();

  event.id = event._id;
  delete event._id;

  return event;
});

module.exports = model("Event", eventSchema);

