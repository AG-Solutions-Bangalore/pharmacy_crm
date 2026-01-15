import ApiErrorPage from "@/components/api-error/api-error";
import {
  PaymentCreate,
  PaymentEdit,
} from "@/components/buttoncontrol/button-component";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { PAYMENT_API } from "@/constants/apiConstants";
import useDebounce from "@/hooks/useDebounce";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import moment from "moment";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
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
    url: PAYMENT_API.getlist,
    queryKey: ["payment-list", pageIndex, debouncedSearch],
    params,
  });

  const columns = [
    {
      header: "Invoice Date",
      accessorKey: "invoiceP_date",
      cell: ({ row }) => {
        const date = row.original.invoiceP_date;
        return date ? moment(date).format("DD MMM YYYY") : "-";
      },
    },
    {
      header: "Company",
      accessorKey: "branch_short",
    },
    {
      header: "Dollar Rate",
      accessorKey: "invoiceP_dollar_rate",
    },

    {
      header: "V Date",
      accessorKey: "invoiceP_v_date",
      cell: ({ row }) => {
        const date = row.original.invoiceP_v_date;
        return date ? moment(date).format("DD MMM YYYY") : "-";
      },
    },
    {
      header: "USD Amount",
      accessorKey: "invoiceP_usd_amount",
    },
    {
      header: "Status",
      accessorKey: "invoiceP_status",
      cell: ({ row }) => (
        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">
          {row.original.invoiceP_status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <PaymentEdit
          onClick={() => navigate(`/payment/edit/${row.original.id}`)}
        />
      ),
    },
  ];

  if (isError) return <ApiErrorPage onRetry={refetch} />;

  return (
    <>
      {isLoading && <LoadingBar />}

      <DataTable
        data={data?.data?.data || []}
        columns={columns}
        pageSize={pageSize}
        searchPlaceholder="Search invoice payment..."
        toolbarRight={
          <PaymentCreate
            onClick={() => {
              navigate("/payment/create");
            }}
          />
        }
        serverPagination={{
          pageIndex,
          pageCount: data?.last_page ?? 1,
          total: data?.total ?? 0,
          onPageChange: setPageIndex,
          onPageSizeChange: setPageSize,
          onSearch: setSearch,
        }}
      />
    </>
  );
};

export default PaymentList;
