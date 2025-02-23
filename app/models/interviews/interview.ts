import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IInterview extends Document { 
  created_date: Date,
  job_id: String,
  candidate_id: String,
  evaluation: any,
  status: String,
}

const interviewSchema: Schema = new mongoose.Schema({
  created_date: {
    type: Date, default: Date.now
  },
  job_id: String,
  candidate_id: String,
  evaluation: Schema.Types.Mixed,
  status: String,
});

const Interview = mongoose.models.interview || mongoose.model<IInterview>("interview", interviewSchema);

export default Interview;
