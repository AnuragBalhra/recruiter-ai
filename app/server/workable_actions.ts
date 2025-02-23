"use server";

const WORKABLE_BASE_URL = "workable.com/spi/v3";

type WorkableConfig = {
  account: string;
  apiKey: string;
};

type WorkableEndpoints = {
  jobs: string;
  job: string;
  stages: string;
  members: string;
};

const createEndpoints = (account: string): WorkableEndpoints => {
  const base = `https://${account}.${WORKABLE_BASE_URL}/`;
  return {
    jobs: `${base}jobs`,
    job: `${base}jobs/`,
    stages: `${base}stages/`,
    members: `${base}members`,
  };
};

const fetchWorkableData = async (
  url: string,
  apiKey: string,
): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const response = await fetch(url, { headers });
  console.log("found data from workable: ", response);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  const json = await response.json();
  console.log("returning newly found workable data: ", json);
  return json;
};


export const getJobsFromWorkable = async (account: string, apiKey: string): Promise<any> => {
  if (!account || !apiKey) {
    throw new Error("Invalid credentials for Workable integration!");
  }
  const endpoints = createEndpoints(account);

  return await fetchWorkableData(`${endpoints.jobs}`, apiKey);
};

export const getJobDetailsFromWorkable = async (account: string, apiKey: string, jobCode: string): Promise<any> => {
  if (!account || !apiKey) {
    throw new Error("Invalid credentials for Workable integration!");
  }
  const endpoints = createEndpoints(account);

  return await fetchWorkableData(`${endpoints.job}${jobCode}`, apiKey);
};

export const getJobApplicationsFromWorkable = async (account: string, apiKey: string, jobCode: string): Promise<any> => {
  if (!account || !apiKey) {
    throw new Error("Invalid credentials for Workable integration!");
  }
  const endpoints = createEndpoints(account);

  return await fetchWorkableData(`${endpoints.job}${jobCode}/candidates`, apiKey);
};
