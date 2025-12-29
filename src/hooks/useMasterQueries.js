import { COUNTRY, PORT } from "@/constants/apiConstants";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";

const useMasterQueries = () => {
  const PortList = useGetApiMutation({
    url: PORT.getlist,
    queryKey: ["port-list"],
  });
  const CountryList = useGetApiMutation({
    url: COUNTRY.getlist,
    queryKey: ["buyer-list"],
  });

  return {
    PortList,
    CountryList,
  };
};

export default useMasterQueries;
