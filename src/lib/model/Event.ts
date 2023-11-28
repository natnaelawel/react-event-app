import { Schema, model, models } from "mongoose";

interface IEvent {
  title: string;
  description: string;
  start: number;
  end: number;
  userId: Schema.Types.ObjectId;
  color?: string;
  allDay: boolean;
}

// user id is the id of the user who created the event

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  color: String,
  allDay: {
    type: Boolean,
    default: false,
  },
});

eventSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
