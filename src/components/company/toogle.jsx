import { COUNTRY_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CountryStatusToggle = ({ countryId, initialStatus, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);
  const { trigger, loading } = useApiMutation();

  const handleToggle = async () => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    try {
      const res = await trigger({
        url: COUNTRY_API.updateStatus(countryId),
        method: "PATCH",
        data: { country_status: newStatus },
      });

      if (res.code === 200) {
        setStatus(newStatus);
        onStatusChange?.();
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error(res.msg || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center space-x-1 px-2 py-1 rounded ${
        status === "Active"
          ? "text-green-800 hover:bg-green-100"
          : "text-red-800 hover:bg-red-100"
      } transition-colors`}
    >
      <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
      <span>{status}</span>
    </button>
  );
};

export default CountryStatusToggle;
