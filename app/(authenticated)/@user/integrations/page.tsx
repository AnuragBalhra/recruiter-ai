"use server";
import React, { useState } from 'react'
import { consoleLog } from '@/utils/logging-utils';
import AccountIntegrationSection from "./account-integrations-section";
import InternalHeaderBar from '@/app/(authenticated)/internal-header-bar';


export default async function IntegrationsPage() {

  return (
    <div className="flex flex-1 flex-col h-screen w-full items-start gap-2 sm:pl-4">
      <InternalHeaderBar title={"Account Integrations"} />

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4">
          <AccountIntegrationSection />
      </main>
    </div>
    );
  }
  