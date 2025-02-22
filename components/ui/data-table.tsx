import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from "./table"
import { TransitionGroup } from "react-transition-group"
import { Slide, Tooltip } from "@mui/material"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from "./button"
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { ArrowUpDown, EllipsisVerticalIcon, MoreHorizontal } from "lucide-react"

const AdditionalActionItems = ({ options }: { options: any }) => {
  return options?.length > 0 && (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          {/* Columns */}
          <EllipsisVerticalIcon className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options?.map((option: any, index: number) => {
          return (
            option && <DropdownMenuItem
              key={index}
              className="capitalize"
              onClick={option?.onClick}
            >
              {option?.text}
            </DropdownMenuItem>
          );
        })}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const TableColumnSelector = ({ table }: { table: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="ml-auto">
          {/* Columns */}
          <AdjustmentsHorizontalIcon className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(
            (column: any) => column.getCanHide()
          )
          .map((column: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value: any) =>
                  column.toggleVisibility(!!value)
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const PageSizeControls = ({ table }: { table: any }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <div>
          <p className="text-sm font-medium">Results per page</p>
        </div>
        <div className="text-xs">
          {table.getPageCount()} Page{table.getPageCount() > 1 && 's'}
        </div>
      </div>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value: any) => {
          table.setPageSize(Number(value))
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[5, 10, 25, 50].map((pageSize: any) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export function DataTable({
  title,
  subtitle,
  table,
  primaryActions,
  secondaryActions
}: {
  title: any,
  subtitle?: any,
  table: any,
  primaryActions?: any,
  secondaryActions?: any
}) {
  return (
    <div className="w-screen lg:w-full px-3 py-3 sm:px-1 lg:px-3 lg:py-5 mx-auto overflow-auto">
      <TransitionGroup>
        <Slide
          appear
          timeout={500}
          direction="up"
          mountOnEnter
          unmountOnExit
        >
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subtitle}
                      </p>
                    </div>

                    <div>

                    </div>


                    <div className="inline-flex gap-x-2">
                      {primaryActions}
                      {secondaryActions?.filter((action: any) => action).length > 0 && (
                        <AdditionalActionItems
                          options={secondaryActions}
                        />
                      )}
                      {/* <a className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" href="#">
                                    View all
                                    </a>

                                    <a className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" strokeLinecap="round"/>
                                    </svg>
                                    Add user
                                    </a> */}
                    </div>

                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        {table?.getHeaderGroups()?.map((headerGroup: any) => (
                          <TableRow key={headerGroup?.id}>
                            {headerGroup?.headers?.map((header: any) => {
                              return (
                                <TableHead key={header?.id} className="text-md font-bold text-gray-900 dark:text-gray-50 px-4">
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                      header?.column?.columnDef?.header,
                                      header?.getContext()
                                    )}
                                </TableHead>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table?.getRowModel()?.rows?.length ? (
                          table?.getRowModel()?.rows?.map((row: any) => (
                            <TableRow
                              key={row?.id}
                              data-state={row?.getIsSelected() && "selected"}
                            >
                              {row?.getVisibleCells()?.map((cell: any) => (
                                <TableCell key={cell.id} className="text-md text-gray-700 dark:text-gray-200 px-4">
                                  {flexRender(cell.column?.columnDef?.cell, cell?.getContext())}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={table?.getHeaderGroups()?.length} className="h-12 text-center">
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <div className="flex flex-col lg:flex-row flex-1 px-4 py-2">
                      <Pagination className="flex flex-row flex-1 justify-center">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => {
                                if (table.getCanPreviousPage()) table.previousPage()
                              }}
                              // disabled={!table.getCanPreviousPage()}
                            />
                          </PaginationItem>
                          <div className="flex-1 text-sm text-muted-foreground mx-5">
                            <div
                              className="flex flex-col">
                              <div>
                                Total {table.getRowCount()} Result{table.getRowCount() > 1 && 's'}
                              </div>
                              <div className="text-xs">
                                {table.getFilteredSelectedRowModel().rows.length > 0 && "(" + table.getFilteredSelectedRowModel().rows.length + " selected)"}
                              </div>
                            </div>
                          </div>
                          <PaginationItem >
                            <PaginationNext
                              onClick={() => {
                                if (table.getCanNextPage()) table.nextPage()
                              }}
                              // disabled={!table.getCanNextPage()}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                      <div className="flex flex-row flex-none gap-3">
                        <PageSizeControls table={table} />
                        <TableColumnSelector table={table} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </TransitionGroup>
    </div>
  )
}
