import { Button } from "@/components/ui/button";
import { Edit, SquarePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { checkPermission } from "./permisssion";

export const BuyerCreate = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "BuyerCreate", buttonPermissions)) {
    return null;
  }

  return (
    <Button variant="default" className={className} onClick={onClick}>
      <SquarePlus className="h-4 w-4 mr-2" />
      Buyer
    </Button>
  );
};

BuyerCreate.page = "Buyer";

export const EditBuyer = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "EditBuyer", buttonPermissions)) {
    return null;
  }

  return (
    <Button onClick={onClick} className={className} variant="ghost" size="icon">
      <Edit className="h-4 w-4 text-black" />
    </Button>
  );
};

EditBuyer.page = "Buyer";

export default {
  BuyerCreate,
  EditBuyer,
};
