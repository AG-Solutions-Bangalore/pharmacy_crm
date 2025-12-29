import React, { useState } from "react";
import ApiErrorPage from "@/components/api-error/api-error";
import DataTable from "@/components/common/data-table";
import LoadingBar from "@/components/loader/loading-bar";
import { COUNTRY_API } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import CountryForm from "./country-form";
import CountryStatusToggle from "@/components/company/toogle";

const CountryList = () => {
  const { data, isLoading, isError, refetch } = useGetApiMutation({
    url: COUNTRY_API.getlist,
    queryKey: ["country-list"],
  });

  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "Country Name",
      accessorKey: "country_name",
    },
    {
      header: "Port",
      accessorKey: "country_port",
    },
    {
      header: "DP",
      accessorKey: "country_dp",
    },
    {
      header: "DA",
      accessorKey: "country_da",
    },
    {
      header: "POL",
      accessorKey: "country_pol",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <CountryStatusToggle
          countryId={row.original.id}
          initialStatus={row.original.country_status}
          onStatusChange={refetch}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <CountryForm editId={row.original.id} onSuccess={refetch} />
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
      searchPlaceholder="Search country..."
      toolbarRight={
        <CountryForm open={open} setOpen={setOpen} onSuccess={refetch} />
      }
    />
  );
};

export default CountryList;
