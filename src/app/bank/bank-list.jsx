import ApiErrorPage from "@/components/api-error/api-error";
import BankStatusToggle from "@/components/bank/toogle";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { BANK_API } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { useState } from "react";
import BankForm from "./bank-form";

const BankList = () => {
  const { data, isLoading, isError, refetch } = useGetApiMutation({
    url: BANK_API.getlist,
    queryKey: ["bank-list"],
  });

  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "Company",
      accessorKey: "branch_short",
    },
    {
      header: "Bank Name",
      accessorKey: "bank_name",
    },
    {
      header: "Account No",
      accessorKey: "bank_acc_no",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <BankStatusToggle
          bankId={row.original.id}
          initialStatus={row.original.bank_status}
          onStatusChange={refetch}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <BankForm editId={row.original.id} onSuccess={refetch} />
      ),
    },
  ];

  if (isLoading) return <LoadingBar />;
  if (isError) return <ApiErrorPage onRetry={refetch} />;

  return (
    <DataTable
      data={data?.data?.data || []}
      columns={columns}
      pageSize={10}
      searchPlaceholder="Search bank..."
      toolbarRight={<BankForm open={open} setOpen={setOpen} />}
    />
  );
};

export default BankList;
