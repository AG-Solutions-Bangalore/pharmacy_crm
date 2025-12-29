import { CONTAINERSIZE_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContainerSizeToggle = ({ initialStatus, teamId: bagId, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);
  const { trigger, loading } = useApiMutation();
  const handleToggle = async () => {
    const newStatus = status === "Active" ? "Inactive" : "Active";

    try {
      const res = await trigger({
        url: CONTAINERSIZE_API.updateStatus(bagId),
        method: "PATCH",
        data: { containerSize_status: newStatus },
      });

      setStatus(newStatus);
      onStatusChange?.(newStatus);
      if (res.code == 200) {
        toast.success(res.msg || "Status Updated", {
          description: `Container Size  changed to ${newStatus}`,
        });
      } else {
        toast.error(res.msg || "Update Failed", {
          description: "Unable to update Container Size",
        });
      }
    } catch (error) {
      toast.error(error.message || "Update Failed", {
        description: "Unable to update Container Size",
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

export default ContainerSizeToggle;
