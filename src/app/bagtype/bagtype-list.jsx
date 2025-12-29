import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { BAG_API } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";

import BagStatusToggle from "@/components/bagtype/toogle";
import { useState } from "react";
import BagTypeForm from "./bagtype-form";

const BagTypeList = () => {
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: BAG_API.getlist,
    queryKey: ["bag-type-list"],
  });

  const columns = [
    {
      header: "Bag Type",
      accessorKey: "bagType",
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <BagStatusToggle
          initialStatus={row.original.bagType_status}
          teamId={row.original.id}
          onStatusChange={refetch}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <BagTypeForm editId={row.original.id} />
        </div>
      ),
    },
  ];

  if (isLoading) return <LoadingBar />;
  if (isError) return <ApiErrorPage onRetry={refetch} />;

  return (
    <>
      <DataTable
        data={data?.data?.data || []}
        columns={columns}
        pageSize={10}
        searchPlaceholder="Search buyer..."
        toolbarRight={
          <>
            <BagTypeForm />
          </>
        }
      />
    </>
  );
};

export default BagTypeList;
