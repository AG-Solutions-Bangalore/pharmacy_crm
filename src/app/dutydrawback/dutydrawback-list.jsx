"use client";

import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { DUTYDRAWBACK_API } from "@/constants/apiConstants";
import useDebounce from "@/hooks/useDebounce";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { useMemo, useState } from "react";
import DutyDrawbackForm from "./dutydrawback-form";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";

const DutyDrawbackList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");

  const debouncedSearch = useDebounce(search);

  /** ✅ API params */
  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      per_page: pageSize,
      ...(debouncedSearch?.trim() && { search: debouncedSearch.trim() }),
    }),
    [pageIndex, pageSize, debouncedSearch, activeTab]
  );

  const { data, isLoading, isError, refetch } = useGetApiMutation({
    url: DUTYDRAWBACK_API.getlist(activeTab),
    queryKey: ["duty-drawback-list", pageIndex, activeTab],
    params,
  });

  const apiData = data?.data;

  const columns = [
    { header: "Company", accessorKey: "branch_short" },
    { header: "Invoice No", accessorKey: "invoice_no" },
    {
      header: "Invoice Date",
      accessorKey: "invoice_date",
      cell: ({ row }) => {
        const date = row.original.invoice_date;
        return date ? moment(date).format("DD-MM-YYYY") : "-";
      },
    },
    { header: "Invoice Status", accessorKey: "invoice_status" },
    { header: "Scroll No", accessorKey: "invoice_dd_scroll_no" },
    {
      header: "DD Date",
      accessorKey: "invoice_dd_date",
      cell: ({ row }) => {
        const date = row.original.invoice_dd_date;
        return date ? moment(date).format("DD-MM-YYYY") : "-";
      },
    },
    {
      header: "DD Status",
      accessorKey: "invoice_dd_status",
      cell: ({ row }) => {
        const status = row.original.invoice_dd_status || "Pending";
        const bgColor =
          status === "Received"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <DutyDrawbackForm rowData={row.original} refetch={refetch} />
      ),
    },
  ];

  if (isError) return <ApiErrorPage onRetry={refetch} />;

  return (
    <>
      {isLoading && <LoadingBar />}
      <Tabs
        value={activeTab}
        onValueChange={(val) => {
          setActiveTab(val);
          setPageIndex(0);
        }}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="Pending" className="w-full">
            Pending
          </TabsTrigger>

          <TabsTrigger value="Received" className="w-full">
            Received
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DataTable
        data={apiData || []}
        columns={columns}
        pageSize={pageSize}
        searchPlaceholder="Search Duty Drawback..."
        serverPagination={{
          pageIndex,
          pageCount: apiData?.last_page ?? 1,
          total: apiData?.total ?? 0,
          onPageChange: setPageIndex,
          onPageSizeChange: setPageSize,
          onSearch: setSearch,
        }}
      />
    </>
  );
};

export default DutyDrawbackList;
