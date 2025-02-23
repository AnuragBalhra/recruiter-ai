import { Box, Modal, Slide, Typography, Alert, Skeleton } from '@mui/material';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getJobApplicationFeedback } from '@/app/server/integration_actions';

function ApplicationFeedbackModal({ open, onClose, applicationId, jobId }: 
    { open: any, onClose: any, applicationId: any, jobId: any }
) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['application_feedback', { open, applicationId, jobId }],
        queryFn: async () => await getJobApplicationFeedback({ applicationId, jobId }),
        enabled: open && !!applicationId && !!jobId,
    })

    const getApplicationFeedbackSkeleton = () => {
        return <div className="flex flex-col gap-5 justify-center items-center p-20">
        <div className="flex flex-col gap-2 justify-center items-start">
            <div className="flex flex-col gap-2 justify-start items-start mb-5">
            <Skeleton variant="rectangular" width={250} height={30} className="rounded-lg" />
            <Skeleton variant="rectangular" width={200} height={10} className="rounded-lg" />
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
            <Skeleton variant="rectangular" width={50} height={30} className="rounded-lg" />
            <Skeleton variant="rectangular" width={250} height={30} className="rounded-lg" />
            <Skeleton variant="rectangular" width={100} height={30} className="rounded-lg" />
            <Skeleton variant="rectangular" width={150} height={30} className="rounded-lg" />
            <Skeleton variant="rectangular" width={200} height={30} className="rounded-lg" />
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
            <Skeleton variant="rectangular" width={50} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={250} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={100} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={150} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={200} height={15} className="rounded-lg" />
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
            <Skeleton variant="rectangular" width={50} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={250} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={100} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={150} height={15} className="rounded-lg" />
            <Skeleton variant="rectangular" width={200} height={15} className="rounded-lg" />
            </div>
        </div>
        </div>
    };
    console.log("application feedback: ", data);
    return (
        <Modal
            open={open}
            onClose={onClose}
            className="flex items-center justify-center"
        >
            <div className="relative flex flex-col flex-1 m-5 max-w-6xl max-h-[600px] bg-white border shadow-sm rounded-xl overflow-auto dark:bg-gray-800 dark:border-gray-700 p-5 no-scrollbar">
                <TransitionGroup>
                    <Slide
                        appear
                        in
                        direction="left"
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div className="h-full w-full flex justify-center items-center align-center pb-12">
                            <div className="flex container w-full max-w-4xl justify-center h-full">
                                <div className="flex flex-col w-full h-full gap-5">
                                    <Box className="flex flex-row gap-3 items-center">
                                        <div className="flex flex-row items-center py-5 px-8 rounded-xl shadow-sm mb-8">
                                            <div className="flex flex-row items-center">
                                                <div className="pl-3">
                                                    <div className="flex flex-row text-md ml-2 font-semibold text-gray-800 dark:text-gray-100">
                                                        Job Application Feedback
                                                    </div>
                                                    <div className="flex flex-row text-xs ml-2 text-gray-500 dark:text-gray-400">
                                                        Candidate's job application feedback as predicted by our AI
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                    {isError ?
                                        <Alert severity="info">{error?.message}</Alert> :
                                        isPending ?
                                            getApplicationFeedbackSkeleton() :
                                                !!data?.evaluation ?
                                                <div className="flex flex-col gap-5">
                                                    {Object.entries(data?.evaluation)?.map(([key, value]) => {
                                                        return (
                                                            <Alert key={key} severity={"success"} className="shadow-lg">
                                                                <span className="font-semibold capitalize">{key}:</span> 
                                                                <span>{`${value}`}</span>
                                                            </Alert>
                                                        )
                                                    })}
                                                    </div>
                                                    :
                                                    <Alert severity="error">No feedback available at the moment.</Alert>
                                            }
                                </div>
                            </div>
                        </div>
                    </Slide>
                </TransitionGroup>
            </div>
        </Modal>
    );
}

export default ApplicationFeedbackModal;