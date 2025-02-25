import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { consoleLog } from '@/utils/logging-utils';
import { updateIntegrationByType, getIntegrationByType } from '@/app/server/integration_actions';
import classnames from 'clsx';
import toast from 'react-hot-toast';

function WorkableIntegrationModal({ open, onClose }: any) {
    const queryClient = useQueryClient();

    const [apiKey, setApiKey] = useState("");
    const [subdomain, setSubdomain] = useState("");
    
    const { isPending, isError, data: response, error } = useQuery({
        queryKey: ['get_integration_by_type'],
        queryFn: () => getIntegrationByType("workable"),
    })
    const integrationPayload = response?.config;
    const integrationExists = response?.status === "active";
    
    const mutation = useMutation<any, any, any>({
        mutationFn: (payload) => {
            return updateIntegrationByType("workable", payload);
        },
        onSuccess: (data, variables, context) => {
            console.log("response from update integration: ", data);
            queryClient.invalidateQueries({ queryKey: ['get_integration_by_type'] })
            onClose();
        },
        onError: (error, variables, context) => {
            consoleLog("Error received during mutation: ", error);
            toast.error(error?.message);
        },
    })
    
    const isLoading = isPending || mutation.isPending;
    return (
        <Modal
            open={open}
            onClose={onClose}
            className="flex items-center justify-center"
            >
            <div className="relative flex flex-col flex-1 max-w-xl bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="absolute top-2 right-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
                        <span className="sr-only">Close</span>
                        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>

                <div className="p-4 sm:p-10 overflow-y-auto">
                    <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                        Integrate Workable
                    </h3>
                    <p className="text-gray-500">
                        Enter required details from your Workable account below.
                    </p>
                    </div>

                    <div className="space-y-4">
                    <div className="flex flex-col max-w-xl gap-3">
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="api_key" value="API Key" />
                                </div>
                                <TextInput
                                    id="api_key"
                                    type="password"
                                    defaultValue={integrationPayload?.api_key}
                                    placeholder="azxsfh...."
                                    onChange={(e) => { setApiKey(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="subdomain" value="Subdomain" />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-col flex-1">
                                        <TextInput
                                            id="subdomain"
                                            type="text"
                                            defaultValue={integrationPayload?.subdomain}
                                            placeholder="smartintervu"
                                            onChange={(e) => { setSubdomain(e.target.value) }}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-none items-center font-medium text-gray-800 dark:text-gray-200">
                                        <span>.workable.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                    <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800 hover:cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className={classnames(
                            "inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 hover:cursor-pointer",
                            isLoading && "opacity-50",
                            isLoading ? "py-2 px-7" : "py-2.5 px-4"
                        )}
                        disabled={isLoading}
                        onClick={() => { 
                            mutation.mutate({ api_key: apiKey, subdomain })
                        }}>
                        {integrationExists ? "Update" : "Integrate"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default WorkableIntegrationModal;