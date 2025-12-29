import { Button } from "@/components/ui/button";
import { Edit, SquarePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { checkPermission } from "./permisssion";
import React, { forwardRef } from "react";

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
//////// MASTER – Bag Type

export const BagTypeCreate = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "BagTypeCreate", buttonPermissions)) {
    return null;
  }

  return (
    <Button variant="default" className={className} onClick={onClick}>
      <SquarePlus className="h-4 w-4 mr-2" />
      Bag Type
    </Button>
  );
};

BagTypeCreate.page = "Bag Type";

export const BagTypeEdit = forwardRef(({ onClick, className }, ref) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "BagTypeEdit", buttonPermissions)) {
    return null;
  }

  return (
    <Button
      onClick={onClick}
      className={className}
      ref={ref}
      variant="ghost"
      size="icon"
    >
      <Edit className="h-4 w-4 text-black" />
    </Button>
  );
});

BagTypeEdit.page = "Bag Type";
/////// MASTER – Bank Create
export const BankCreate = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "BankCreate", buttonPermissions)) {
    return null;
  }

  return (
    <Button variant="default" className={className} onClick={onClick}>
      <SquarePlus className="h-4 w-4 mr-2" />
      Bank
    </Button>
  );
};

BankCreate.page = "Bank";

/////// MASTER – Bank Edit
export const BankEdit = forwardRef(({ onClick, className }, ref) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "BankEdit", buttonPermissions)) {
    return null;
  }

  return (
    <Button
      ref={ref}
      onClick={onClick}
      className={className}
      variant="ghost"
      size="icon"
    >
      <Edit className="h-4 w-4 text-black" />
    </Button>
  );
});

BankEdit.page = "Bank";
/////// MASTER – Container Size
export const ContainerSizeCreate = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (
    !checkPermission(String(userId), "ContainerSizeCreate", buttonPermissions)
  ) {
    return null;
  }

  return (
    <Button variant="default" className={className} onClick={onClick}>
      <SquarePlus className="h-4 w-4 mr-2" />
      Container Size
    </Button>
  );
};

ContainerSizeCreate.page = "Container Size";

/////// MASTER – Container Size
export const ContainerSizeEdit = forwardRef(({ onClick, className }, ref) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (
    !checkPermission(String(userId), "ContainerSizeEdit", buttonPermissions)
  ) {
    return null;
  }

  return (
    <Button
      ref={ref}
      onClick={onClick}
      className={className}
      variant="ghost"
      size="icon"
    >
      <Edit className="h-4 w-4 text-black" />
    </Button>
  );
});

ContainerSizeEdit.page = "Container Size";
/////// MASTER – Country Create
export const CountryCreate = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "CountryCreate", buttonPermissions)) {
    return null;
  }

  return (
    <Button variant="default" className={className} onClick={onClick}>
      <SquarePlus className="h-4 w-4 mr-2" />
      Country
    </Button>
  );
};

CountryCreate.page = "Country";

/////// MASTER – Container Size
export const CountryEdit = forwardRef(({ onClick, className }, ref) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "CountryEdit", buttonPermissions)) {
    return null;
  }

  return (
    <Button
      ref={ref}
      onClick={onClick}
      className={className}
      variant="ghost"
      size="icon"
    >
      <Edit className="h-4 w-4 text-black" />
    </Button>
  );
});

CountryEdit.page = "Country";
/////// MASTER – GR Code
export const GRCodeCreate = ({ onClick, className }) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "GRCodeCreate", buttonPermissions)) {
    return null;
  }

  return (
    <Button variant="default" className={className} onClick={onClick}>
      <SquarePlus className="h-4 w-4 mr-2" />
      Gr Code
    </Button>
  );
};

GRCodeCreate.page = "Gr Code";

/////// MASTER – Gr Code
export const GRCodeEdit = forwardRef(({ onClick, className }, ref) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const buttonPermissions = useSelector(
    (state) => state.permissions.buttonPermissions
  );

  if (!checkPermission(String(userId), "GRCodeEdit", buttonPermissions)) {
    return null;
  }

  return (
    <Button
      ref={ref}
      onClick={onClick}
      className={className}
      variant="ghost"
      size="icon"
    >
      <Edit className="h-4 w-4 text-black" />
    </Button>
  );
});

GRCodeEdit.page = "Gr Code";
export default {
  BuyerCreate,
  EditBuyer,
  BagTypeCreate,
  BagTypeEdit,
  BankCreate,
  BankEdit,
  ContainerSizeCreate,
  ContainerSizeEdit,
  CountryCreate,
  CountryEdit,
  GRCodeCreate,
  GRCodeEdit,
};
