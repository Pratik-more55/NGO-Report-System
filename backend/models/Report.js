import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    ngoId: { type: String, required: true },
    month: { type: String, required: true },
    peopleHelped: { type: Number, required: true },
    eventsConducted: { type: Number, required: true },
    fundsUtilized: { type: Number, required: true }
  },
  { timestamps: true }
);

reportSchema.index({ ngoId: 1, month: 1 }, { unique: true });

export default mongoose.model("Report", reportSchema);
