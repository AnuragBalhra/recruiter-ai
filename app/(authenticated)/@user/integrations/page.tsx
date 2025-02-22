"use server";
import React, { useState } from 'react'
import { consoleLog } from '@/utils/logging-utils';
import AccountIntegrationSection from "./account-integrations-section";
import InternalHeaderBar from '@/app/(authenticated)/internal-header-bar';


export default async function IntegrationsPage() {

  return (
    <div className="flex flex-1 flex-col h-screen w-full items-start gap-2 sm:pl-4">
      <InternalHeaderBar title={"Account Integrations"} />

      <div className="col-span-9 sm:gap-4 p-4 sm:px-0 sm:py-4">
          <AccountIntegrationSection />
      </div>
    </div>
    );
  }
  