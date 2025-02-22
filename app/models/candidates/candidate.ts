import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ICandidate extends Document { 
  created_date: Date,
  workable_id: String,
  name: String,
  job: {
    title: String,
    short_code: String,
  },
  email: String,
  stage: String,  
}

const candidateSchema: Schema = new mongoose.Schema({
  created_date: {
    type: Date, default: Date.now
  },
  name: String,
  workable_id: String,
  job: {
    title: String,
    short_code: String,
  },
  email: String,
  stage: String,
});

const Candidate = mongoose.models.candidate || mongoose.model<ICandidate>("candidate", candidateSchema);

export default Candidate;
