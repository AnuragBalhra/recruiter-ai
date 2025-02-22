"use client";
import React, { useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BreadcrumbOption } from './breadcrumb.types';
import Link from "next/link"


export default function CustomBreadcrumb({ options }: {options: BreadcrumbOption[]}) {
  
  return (
    <Breadcrumb className="hidden md:flex px-5 py-3">
      <BreadcrumbList>
        {options.map((option, index) => { 
          return (
            <div key={index} className="flex flex-row items-center justify-center">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={option?.link ?? "#"}>{option?.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {(index !== options.length - 1) && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
