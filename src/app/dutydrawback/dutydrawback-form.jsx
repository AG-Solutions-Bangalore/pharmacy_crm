"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DUTYDRAWBACK_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Calendar22 } from "@/components/ui/calendar-22";
import Field from "@/components/SelectField/Field";
import { DutyDrawbackEdit } from "@/components/buttoncontrol/button-component";
import { useQueryClient } from "@tanstack/react-query";

const INITIAL_STATE = {
  invoice_dd_scroll_no: "",
  invoice_dd_date: "",
  invoice_dd_status: "Pending",
};

const DutyDrawbackForm = ({ rowData }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);

  const { trigger, loading } = useApiMutation();

  useEffect(() => {
    if (!open || !rowData) return;

    setFormData({
      invoice_dd_scroll_no: rowData.invoice_dd_scroll_no || "",
      invoice_dd_date: rowData.invoice_dd_date || "",
      invoice_dd_status: rowData.invoice_dd_status || "Pending",
    });
  }, [open, rowData]);

  const handleSubmit = async () => {
    if (!formData.invoice_dd_scroll_no.trim() || !formData.invoice_dd_date) {
      toast.error("Scroll No and Date are required");
      return;
    }

    try {
      const res = await trigger({
        url: DUTYDRAWBACK_API.updateById(rowData.id),
        method: "PUT",
        data: formData,
      });

      if (res.code === 201) {
        queryClient.invalidateQueries(["duty-drawback-list"]);
        toast.success(res.msg || "Duty Drawback updated successfully");
        setOpen(false);
      } else {
        toast.error(res.msg || "Something went wrong");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DutyDrawbackEdit />
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium">Edit Duty Drawback</h4>

          <Field
            label="Scroll No"
            placeholder="Scroll No"
            value={formData.invoice_dd_scroll_no}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                invoice_dd_scroll_no: value,
              }))
            }
          />

          <Calendar22
            label="DD Date *"
            value={formData.invoice_dd_date}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                invoice_dd_date: value,
              }))
            }
          />

          <Select
            value={formData.invoice_dd_status}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                invoice_dd_status: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Update Duty Drawback"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DutyDrawbackForm;
