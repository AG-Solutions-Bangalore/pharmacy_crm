import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BANK_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";

const BankStatusToggle = ({ initialStatus, bankId, onStatusChange }) => {
  console.log(initialStatus);

  const [status, setStatus] = useState(initialStatus);
  const { trigger, loading } = useApiMutation();

  const handleToggle = async () => {
    const newStatus = status === "Active" ? "Inactive" : "Active";

    try {
      const res = await trigger({
        url: BANK_API.updateStatus(bankId),
        method: "PATCH",
        data: { bank_status: newStatus },
      });

      if (res?.code === 200) {
        setStatus(newStatus);
        onStatusChange?.(newStatus);

        toast.success(res.msg || "Status Updated", {
          description: `Bank status changed to ${newStatus}`,
        });
      } else {
        toast.error(res.msg || "Update Failed", {
          description: "Unable to update Bank status",
        });
      }
    } catch (error) {
      toast.error(error.message || "Update Failed", {
        description: "Unable to update Bank status",
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

export default BankStatusToggle;
