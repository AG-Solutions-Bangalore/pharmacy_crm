import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Field = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  required,
  hideLabel,
  disabled,
  className,
  readOnly,
}) => (
  <div>
    {!hideLabel && <Label>{label}</Label>}
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={className}
      readOnly={readOnly}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);
export default Field;
