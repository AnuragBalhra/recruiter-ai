"use server";

import dbConnect from "@/lib/db-connect";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { consoleLog } from '@/utils/logging-utils';


export const getPaginatedEntities = async ({page = 1, pageSize = 5, model, query, sortQuery = { created_date: -1 }}: 
  {page: number, pageSize: number, model: any, query: any, sortQuery?: any}) => {
  const { userId, orgId } = auth();
  if (!userId) {
    return { error: true, message: "No Logged In User" };
  }

  console.log("getting entities: ");

  await dbConnect();
  const skip = (page - 1) * pageSize;
  
  try {
      const entities = await model.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort(sortQuery);

      const count = await model.find(query).countDocuments();
      console.log("paginated entities: ", entities);
      const response = { 
        entities, 
        metadata: { 
          currentPage: page, 
          totalPages: Math.ceil(count / pageSize), 
          count 
        } 
      };
    
      console.log("paginated entities response: ", response);
      return JSON.parse(JSON.stringify(response));
  } catch (err: any) {
    console.error("error while fetching paginated entities: ", err);
    return { error: true, message: err?.message };
  }
};