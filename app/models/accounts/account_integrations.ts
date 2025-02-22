import mongoose, { Document, Schema } from "mongoose";

export interface IAccountIntegrations extends Document { 
  account_id: String,
  account_type: String,
  integration_type: String,
  status: String,
  config: any,
}

const integrationSchema: Schema = new mongoose.Schema({
  account_id: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
  integration_type: String,
  status: String,
  config: Schema.Types.Mixed,
});

const AccountIntegrations = mongoose.models.account_integrations || mongoose.model<IAccountIntegrations>("account_integrations", integrationSchema);
export default AccountIntegrations;