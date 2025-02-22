import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IAgent extends Document { 
  created_date: Date,
  context: String,
  user_id: String,
  org_id: String,
  status: String,
  name: String,
  description: String,
  metadata: any,
}

const agentSchema: Schema = new mongoose.Schema({
  name: String,
  description: String,
  context: String,
  status: String,
  created_date: {
    type: Date, default: Date.now
  },
  user_id: String,
  org_id: String,
  metadata: Schema.Types.Mixed,
});

const Agent = mongoose.models.agent || mongoose.model<IAgent>("agent", agentSchema);

export default Agent;
