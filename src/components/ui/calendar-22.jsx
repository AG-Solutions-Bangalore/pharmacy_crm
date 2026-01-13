import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import moment from "moment";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar22({
  label,
  value,
  onChange,
  error,
  placeholder,
  disabled,
}) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = value ? moment(value, "YYYY-MM-DD").toDate() : undefined;

  const [month, setMonth] = React.useState(selectedDate || new Date());

  React.useEffect(() => {
    if (selectedDate) {
      setMonth(selectedDate);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="w-full justify-between font-normal"
          >
            {value
              ? moment(value).format("DD MMM YYYY")
              : placeholder
              ? placeholder
              : "Select date"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            modifiersClassNames={{
              today:
                "bg-transparent text-black border border-none rounded-full",
            }}
            onSelect={(date) => {
              if (!date) return;

              const formatted = moment(date).format("YYYY-MM-DD");
              onChange(formatted);
              setMonth(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
