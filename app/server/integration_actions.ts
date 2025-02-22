"use server";

import dbConnect from "@/lib/db-connect";
import { auth, clerkClient } from "@clerk/nextjs/server";
import AccountIntegrations from "@/app/models/accounts/account_integrations";
import { getJobsFromWorkable, getJobDetailsFromWorkable } from "@/app/server/workable_actions";

export const getIntegrationByType = async (integrationType: string) => {
  const { userId, orgId } = auth();
  
  if (!userId && !orgId) {
    return { error: true, message: "Unable to verify credentials." };
  }

  const accountId = orgId ?? userId;
  const accountType = orgId ? "org" : "user";
    
  await dbConnect();
  
  try {
    const integration = await AccountIntegrations.findOne({ 
      account_id: accountId, 
      account_type: accountType, 
      integration_type: integrationType,
      status: "active"
    });
    console.log("found account integration: ", integration);
    return JSON.parse(JSON.stringify(integration));;
  } catch (err: any) {
    console.log("got error while updating account integration: ", err)
    return { error: true, message: err?.message };
  }
};

export const updateIntegrationByType = async (integrationType: string, config: any) => {
  const { userId, orgId } = auth();
  
  if (!userId && !orgId) {
    return { error: true, message: "Unable to verify credentials." };
  }

  const accountId = orgId ?? userId;
  const accountType = orgId ? "org" : "user";
    
  await dbConnect();
  
  try {
    const integration = await AccountIntegrations.updateOne({ 
        account_id: accountId, 
        account_type: accountType, 
        integration_type: integrationType,
        status: "active"
      }, 
      { $set: {
          config
        }
      },
      { upsert: true}
    );
    console.log("added account integration: ", integration);
    return JSON.parse(JSON.stringify(integration));;
  } catch (err: any) {
    console.log("got error while updating account integration: ", err)
    return { error: true, message: err?.message };
  }
};

export const getJobsByIntegrationType = async ({ integrationType }: { integrationType: string }) => {
  const { userId, orgId } = auth();
  console.log("getting jobs by integration type for user: ", userId, orgId);

  if (!userId && !orgId) {
    return { error: true, message: "Unable to verify credentials." };
  }

  await dbConnect();

  const accountId = orgId ?? userId;
  const accountType = orgId ? "org" : "user";

  try {
    const integration = await AccountIntegrations.findOne({ 
      account_id: accountId, 
      account_type: accountType, 
      integration_type: integrationType,
      status: "active"
    });
    console.log("found workable integration while getting jobs: ", integration);
    let response = {jobs: []};
    if(integrationType === "workable") {
      const { subdomain: account, api_key: apiKey } = integration?.config;
      console.log("getting jobs with account and apiKey: ", account, apiKey);
      response = await getJobsFromWorkable(account, apiKey);
    }
    return JSON.parse(JSON.stringify(response));
  } catch (err) {
    console.log("error getting user details: ", err);
    return { error: true, message: "There was an error getting user details." };
  }
};

export const getJobsDetailsFromATS = async ({ integrationType, externalId }: { integrationType: string, externalId: string }) => {
  const { userId, orgId } = auth();
  console.log("getting jobs by integration type for user: ", userId, orgId);

  if (!userId && !orgId) {
    return { error: true, message: "Unable to verify credentials." };
  }

  await dbConnect();
  
  const accountId = orgId ?? userId;
  const accountType = orgId ? "org" : "user";

  try {
    const integration = await AccountIntegrations.findOne({ 
      account_id: accountId, 
      account_type: accountType, 
      integration_type: integrationType,
      status: "active"
    });
    console.log("found workable integration while getting jobs: ", integration);
    let response = {jobs: []};
    if(integrationType === "workable") {
      const { subdomain: account, api_key: apiKey } = integration?.config;
      console.log("getting jobs with account and apiKey: ", account, apiKey);
      response = await getJobDetailsFromWorkable(account, apiKey, externalId);
    }
    return JSON.parse(JSON.stringify(response));
  } catch (err) {
    console.log("error getting user details: ", err);
    return { error: true, message: "There was an error getting user details." };
  }
};