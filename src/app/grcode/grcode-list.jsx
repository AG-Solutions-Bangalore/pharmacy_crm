import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { GRCODE_API } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";

import GrCodeStatusToggle from "@/components/grcode/togggle";
import GrCodeForm from "./grcode-form";

const GrCodeList = () => {
  const { data, isLoading, isError, refetch } = useGetApiMutation({
    url: GRCODE_API.getlist,
    queryKey: ["grcode-list"],
  });

  const columns = [
    {
      header: "Product Name",
      accessorKey: "product_name",
    },
    {
      header: "Description",
      accessorKey: "gr_code_des",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <GrCodeStatusToggle
          initialStatus={row.original.gr_code_status}
          grcodeId={row.original.id}
          onStatusChange={refetch}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <GrCodeForm editId={row.original.id} onSuccess={refetch} />
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
      searchPlaceholder="Search GrCode..."
      toolbarRight={<GrCodeForm onSuccess={refetch} />}
    />
  );
};

export default GrCodeList;
