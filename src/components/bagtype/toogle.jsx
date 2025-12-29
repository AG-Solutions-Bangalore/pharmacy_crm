import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BAG_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";

const BagStatusToggle = ({ initialStatus, teamId: bagId, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);

  const { trigger, loading } = useApiMutation();

  const handleToggle = async () => {
    const newStatus = status === "Active" ? "Inactive" : "Active";

    try {
      const res = await trigger({
        url: BAG_API.updateStatus(bagId),
        method: "PATCH",
        data: { bagType_status: newStatus },
      });

      setStatus(newStatus);
      onStatusChange?.(newStatus);
      if (res.code == 200) {
        toast.success(res.msg || "Status Updated", {
          description: `Bag Type  changed to ${newStatus}`,
        });
      } else {
        toast.error(res.msg || "Update Failed", {
          description: "Unable to update Bag Type",
        });
      }
    } catch (error) {
      toast.error(error.message || "Update Failed", {
        description: "Unable to update Bag Type",
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center space-x-1 px-2 py-1 rounded
        ${
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

export default BagStatusToggle;
