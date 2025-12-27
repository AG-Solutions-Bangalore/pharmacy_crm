import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { BUYER_LIST } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import BuyerForm from "./buyer-form";
import {
  BuyerCreate,
  EditBuyer,
} from "@/components/buttoncontrol/button-component";

const BuyerList = () => {
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: BUYER_LIST.getlist,
    queryKey: ["buyer-list"],
  });
  const [open, setOpen] = useState(false);
  const [editId, setEdit] = useState(null);

  const columns = [
    {
      header: "Buyer Code",
      accessorKey: "buyer_sort",
    },
    {
      header: "Buyer Name",
      accessorKey: "buyer_name",
    },
    {
      header: "Country",
      accessorKey: "buyer_country",
    },
    {
      header: "Port",
      accessorKey: "buyer_port",
    },
    {
      header: "Status",
      accessorKey: "buyer_status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.buyer_status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.buyer_status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <EditBuyer
            onClick={() => {
              setEdit(row.original?.id);
              setOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  if (isLoading) return <LoadingBar />;
  if (isError) return <ApiErrorPage onRetry={refetch} />;
  const handleCreate = () => {
    setOpen(true);
    setEdit(null);
  };
  return (
    <>
      <DataTable
        data={data?.data?.data || []}
        columns={columns}
        pageSize={10}
        searchPlaceholder="Search buyer..."
        toolbarRight={
          <>
            <BuyerCreate onClick={handleCreate} className="ml-2" />
          </>
        }
      />
      {open && <BuyerForm open={open} setOpen={setOpen} editId={editId} />}
    </>
  );
};

export default BuyerList;
