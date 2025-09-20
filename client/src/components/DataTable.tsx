import { useEffect, useState } from "react";
import axios from 'axios'

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type PaginationState,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";



type Invoice = {
    id: number;
    vendor_name: string;
    amount: number;
    due_date: string;
    description: string;
    paid: boolean;
    userId: number;
};

const columns: ColumnDef<Invoice>[] = [
    { accessorKey: "id", header: "Invoice No" },
    { accessorKey: "vendor_name", header: "Vendor" },
    { accessorKey: "amount", header: "Amount" },
    {
        accessorKey: "due_date",
        header: "Due Date",
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    { accessorKey: "description", header: "Description" },
    {
        accessorKey: "paid",
        header: "Paid",
        cell: (info) => ((info.getValue() as boolean) ? "✅" : "❌"),
    },
];

export default function DataTable() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })


    useEffect(() => {
        axios.get("http://localhost:3000/invoices", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => setInvoices(res.data.invoices))
            .catch((err) => console.error(err));
    }, []);

    const viewInvoiceDetails = (id: number) => {
        axios.get(`http://localhost:3000/invoices/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => setSelectedInvoice(res.data))
            .catch((err) => console.error(err));
    }



    const table = useReactTable({
        data: invoices,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        }
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl text-start mb-2"> All your Invoices</h1>
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-2 border-b border-gray-300 text-left"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 cursor-pointer text-left" onClick={() => viewInvoiceDetails(row.original.id)}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 border-b border-gray-200">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="flex items-center gap-2">
                <Button
                    className="border rounded p-1"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </Button>
                <Button
                    className="border rounded p-1"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        min="1"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>


            {/* popup */}
            {selectedInvoice && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.5)]">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative opacity-100">
                        <Button
                            className="absolute top-2 right-4 hover:text-slate-600 cursor-pointer"
                            onClick={() => setSelectedInvoice(null)}
                        >
                            ✖
                        </Button>
                        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
                        <Table>
                            <TableCaption>Full details of your invoice</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">invoice ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Due Date:</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">{selectedInvoice.id}</TableCell>
                                    <TableCell>{selectedInvoice.vendor_name}</TableCell>
                                    <TableCell>{new Date(selectedInvoice.due_date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">{selectedInvoice.paid ? "✅ Paid" : "❌ Not Paid"}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}