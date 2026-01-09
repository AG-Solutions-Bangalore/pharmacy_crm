import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  optionKey,
  optionLabel,
  error,
  required,
  disabled,
}) => (
  <div>
    <Label>
      {label} {required ? "*" : ""}
    </Label>
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled} // ✅ IMPORTANT
    >
      <SelectTrigger className={disabled ? "bg-muted cursor-not-allowed" : ""}>
        <SelectValue placeholder={`Select ${label ? label : "Value"}`} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((o) => (
          <SelectItem key={o[optionKey]} value={String(o[optionKey])}>
            {o[optionLabel]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default SelectField;
