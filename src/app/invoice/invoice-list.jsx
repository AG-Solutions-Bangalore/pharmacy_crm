import {
  InvoiceCreate,
  InvoiceEdit,
} from "@/components/buttoncontrol/button-component";
import DataTable from "@/components/common/data-table";
import ToggleStatus from "@/components/common/status-toggle";
import LoadingBar from "@/components/loader/loading-bar";
import { CONTRACT_API, INVOICE_API } from "@/constants/apiConstants";
import useDebounce from "@/hooks/useDebounce";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import moment from "moment";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      per_page: pageSize,
      ...(debouncedSearch?.trim() && { search: debouncedSearch.trim() }),
    }),
    [pageIndex, pageSize, debouncedSearch]
  );

  const { data, isLoading, isError, refetch } = useGetApiMutation({
    url: INVOICE_API.getlist,
    queryKey: ["invoice-list", pageIndex, debouncedSearch],
    params,
  });
  const apiData = data;

  const columns = [
    {
      header: "Date",
      accessorKey: "invoice_date",
      cell: ({ row }) => {
        const date = row.original.invoice_date;
        return date ? moment(date).format("DD MMM YYYY") : "";
      },
    },
    { header: "Company", accessorKey: "branch_short" },
    { header: "Invoice No", accessorKey: "invoice_no" },
    { header: "Buyer Name", accessorKey: "invoice_buyer" },
    { header: "Consignee Name", accessorKey: "invoice_consignee" },
    {
      header: "Status",
      accessorKey: "invoice_status",
      cell: ({ row }) => (
        <ToggleStatus
          initialStatus={row.original.invoice_status}
          apiUrl={INVOICE_API.updateStatus(row.original.id)}
          payloadKey="invoice_status"
          onSuccess={refetch}
          activeValue="Open"
          inactiveValue="Close"
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <InvoiceEdit
          onClick={() => navigate(`/invoice/edit/${row.original.id}`)}
        />
      ),
    },
  ];

  if (isError) return <ApiErrorPage onRetry={refetch} />;

  return (
    <>
      {isLoading && <LoadingBar />}
      <DataTable
        data={apiData?.data?.data || []}
        columns={columns}
        pageSize={pageSize}
        searchPlaceholder="Search invoice..."
        toolbarRight={
          <InvoiceCreate onClick={() => navigate("/invoice/create")} />
        }
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

export default InvoiceList;
