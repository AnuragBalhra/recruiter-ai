"use server";

import dbConnect from "@/lib/db-connect";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Agent from "../models/agents/agent";
import { getPaginatedEntities } from "@/app/server/common_actions";


export const getMyAgents = async ({page = 1, pageSize = 5}: {page: number, pageSize: number}) => {
  const { userId, orgId } = auth();
  if (!userId) {
    return { error: true, message: "No Logged In User" };
  }

  console.log("getting interview agents: ");

  const query = { user_id: userId, org_id: orgId };
  return await getPaginatedEntities({ page, pageSize, model: Agent, query: query });
};

export const addAgent = async ({payload}: {payload: any}) => {
  const { userId, orgId } = auth();
  if (!userId) {
    return { error: true, message: "No Logged In User" };
  }

  console.log("adding agent: ", payload);

  const response = await Agent.create({
    context: payload?.context,
    user_id: userId,
    org_id: orgId,
  });
  console.log("response from create agent: ", response)
  return JSON.parse(JSON.stringify(response));
};

export const getAgentDetails = async ({agentId}: {agentId: any}) => {
  const { userId, orgId } = auth();
  if (!userId) {
    return { error: true, message: "No Logged In User" };
  }

  console.log("getting agent details: ", agentId);

  const response = await Agent.findOne({
    _id: agentId,
  });
  console.log("response from get agent details: ", response)
  return JSON.parse(JSON.stringify(response));
};

export const getUserDetails = async ({ userId }: { userId: string }) => {
  console.log("getting user details: ", userId);

  if (!userId) {
    return { error: true, message: "No Logged In User" };
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    console.log("found user: ", user);
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.log("eror getting user details: ", err);
    return { error: true, message: "There was an error getting user details." };
  }
};