"use client";
import React, { useState } from 'react'
import { consoleLog } from '@/utils/logging-utils';
import { useQuery } from '@tanstack/react-query';
import { Box, Skeleton } from '@mui/material';
import { getIntegrationByType } from '@/app/server/integration_actions';
import WorkableIntegrationCard from './workable-integration-card';
import { useAuth } from "@clerk/nextjs"

export default function AccountIntegrationSection() {

  return (
    <div className="flex-flex-row">
      <WorkableIntegrationCard />
    </div>
    );
  }
  