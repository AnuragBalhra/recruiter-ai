import React, { useState } from 'react'
import { consoleLog } from '@/utils/logging-utils';
import { useQuery } from '@tanstack/react-query';
import { Box, Fade, Skeleton } from '@mui/material';
import { getIntegrationByType } from '@/app/server/integration_actions';
import { TransitionGroup } from 'react-transition-group';
import WorkableIntegrationModal from './workable-integration-modal';
import Alert from '@mui/material/Alert';

export default function WorkableIntegrationCard({ }) {
  
  const [openModal, setOpenModal] = useState(false);

  const { isPending, isError, data: response, error } = useQuery({
    queryKey: ['get_integration_by_type'],
    queryFn: () => getIntegrationByType("workable"),
  })
  const integrationExists = response?.status === "active";
  consoleLog("integration payload: ", integrationExists, response);

  const getWorkableIntegrationSkeleton = () => {
    return <Box className="flex flex-col gap-5 justify-center items-center p-20">
      <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-60 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-40 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-40 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-40 rounded-md" height={15} />
        </div>
        <div className="hidden lg:flex lg:flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-40 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
        </div>
        <div className="hidden xl:flex xl:flex-col gap-2 justify-center items-center">
          <Skeleton variant="rectangular" className="w-60 rounded-xl" height={30} />  
          <Skeleton variant="rectangular" className="w-60 rounded-md" height={15} />
          <Skeleton variant="rectangular" className="w-40 rounded-md" height={15} />
        </div>
      </div>
    </Box>
  };

  if (isPending) { 
    return getWorkableIntegrationSkeleton();
  }

  if (isError) {
    return error?.message && <Alert severity="info">{error?.message}</Alert>
  }

  return (
    <div className="col-span-4 flex flex-col">
      <TransitionGroup>
        <Fade
          appear
          in
          timeout={500}
          mountOnEnter
          unmountOnExit
          >
          <div className="flex flex-col h-full bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] justify-between">
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Workable
              </h3>
              <p className="mt-2 text-gray-800 dark:text-gray-400 text-sm">
                  Integrate with Workable(ATS) to automatically sync job details, applications and candidate resumes.
              </p>  
            </div>
            <div className="flex flex-1 justify-center items-center py-5">
              <a className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 hover:cursor-pointer"
                onClick={() => { 
                  setOpenModal(true);
                }}>
                {integrationExists ? "Update Integration" : "Enable Integration"}
              </a>
            </div>
            <div>
              <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    Requires api_key and domain from your workable account
                  </p>
              </div>
            </div>
          </div>
        </Fade>
      </TransitionGroup>
      <WorkableIntegrationModal
        open={openModal}
        onClose={() => { setOpenModal(false); }}
      />
    </div>
    );
  }
  