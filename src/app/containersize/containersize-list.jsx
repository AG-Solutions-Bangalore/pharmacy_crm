import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { CONTAINERSIZE_API } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";

import ContainerSizeToggle from "@/components/containersize/toogle";
import ContainerSizeForm from "./containersize-form";

const ContainerSizeList = () => {
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: CONTAINERSIZE_API.getlist,
    queryKey: ["containersize-list"],
  });

  const columns = [
    {
      header: "Container Size",
      accessorKey: "containerSize",
    },

    {
      header: "Status",
      accessorKey: "containerSize_status",
      cell: ({ row }) => (
        <ContainerSizeToggle
          initialStatus={row.original.containerSize_status}
          teamId={row.original.id}
          onStatusChange={refetch}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <ContainerSizeForm editId={row.original.id} />
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
            <ContainerSizeForm />
          </>
        }
      />
    </>
  );
};

export default ContainerSizeList;
