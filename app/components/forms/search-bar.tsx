"use client";
import React, { useRef } from 'react';
import { consoleLog } from '@/utils/logging-utils';
import { SlidersHorizontalIcon } from "lucide-react"; 

export default function SearchBar({ label, placeholder, onEnter, loading, allowFilters = false, openFilters = () => { } }:
    { label: any, placeholder?: string | null, onEnter: any, loading: any, allowFilters: any, openFilters: any }) {
    const searchInputRef = useRef<any>();
    const submitQuery = () => { 
        onEnter(searchInputRef?.current?.value);
    }
    return (
        <div className="mx-2 my-5">
            <div className="flex flex-col flex-1">
                <label htmlFor="hs-search-box-with-loading-5" className="block text-sm font-medium mb-2 dark:text-white">{label}</label>
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <div className="relative flex flex-1 rounded-md shadow-sm">
                        <input
                            ref={searchInputRef}
                            type="text"
                            id="hs-search-box-with-loading-5"
                            name="hs-search-box-with-loading-5"
                            className="py-3 px-4 md:pl-11 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                            placeholder={placeholder ?? "Input search"} />
                        <div className="hidden md:absolute inset-y-0 left-0 md:flex items-center pointer-events-none md:pl-4">
                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>
                        <button
                            onClick={submitQuery}
                            className="py-1 md:py-3 px-2 md:px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
                            {loading && <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </span>}
                            Search
                        </button>
                    </div>
                    {allowFilters && <button
                        type="button"
                        onClick={openFilters}
                        className="py-2 md:py-3 px-2 md:px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 transition-all text-sm">
                        <SlidersHorizontalIcon className="w-4 h-4" />
                        Filters
                    </button>}
                </div>
            </div>
        </div>
    );
}