"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Field from "@/components/SelectField/Field";
import SelectField from "@/components/SelectField/SelectField";
import { INVOICE_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";
import useMasterQueries from "@/hooks/useMasterQueries";
import LoadingBar from "@/components/loader/loading-bar";
import ApiErrorPage from "@/components/api-error/api-error";
import { useParams, useNavigate } from "react-router-dom";

/* ---------------- EMPTY STRUCT ---------------- */

const EMPTY_PACKING_SUB = {
  invoicePackingSub_ref: "",
  invoicePackingSub_carton_no: "",
  invoicePackingSub_box_size: "",
  invoicePackingSub_item_id: "",
  invoicePackingSub_batch_no: "",
  invoicePackingSub_qnty: "",
  invoicePackingSub_net_weight: "",
  invoicePackingSub_gross_weight: "",
  invoicePackingSub_selling_price: "",
  purchase_sub_id: "",
  invoicePackingSub_manufacture_date: "",
  invoicePackingSub_expire_date: "",
  invoicePackingSub_mrp: "",
  invoicePackingSub_item_gst: "",
};

/* ---------------- COMPONENT ---------------- */

const InvoicePackingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { trigger: fetchInvoice, loading } = useApiMutation();
  const { trigger: savePacking, loading: saving } = useApiMutation();

  const master = useMasterQueries(["item", "activepurchaseother", "cartonbox"]);

  const {
    data: itemData,
    isLoading: loadingItem,
    error: itemError,
  } = master.item;

  const {
    data: batchData,
    isLoading: loadingBatch,
    error: batchError,
  } = master.activepurchaseother;

  const {
    data: cartonboxData,
    isLoading: loadingCarton,
    error: cartonboxError,
  } = master.cartonbox;

  const [subs1, setSubs1] = useState([]);

  /* ---------------- FETCH INVOICE ---------------- */

  useEffect(() => {
    if (!id) return;

    (async () => {
      const res = await fetchInvoice({ url: INVOICE_API.getById(id) });
      const invoiceSubs = res?.data?.subs || [];

      const packingRows = invoiceSubs.map((s) => {
        // find batch ID in master based on item + batch_no
        const selectedBatch = batchData?.data?.find(
          (b) => String(b.purchaseSub_item_id) === String(s.invoiceSub_item_id)
        );
        console.log(selectedBatch, "selectedBatch");
        return {
          ...EMPTY_PACKING_SUB,
          invoicePackingSub_ref: s.invoiceSub_ref ?? "",
          invoicePackingSub_item_id: String(s.invoiceSub_item_id ?? ""),
          invoicePackingSub_batch_no: String(selectedBatch?.id ?? ""), // ✅ batch id
          invoicePackingSub_qnty: s.invoiceSub_qnty ?? "",
          invoicePackingSub_selling_price: s.invoiceSub_selling_rate ?? "",
          purchase_sub_id: String(s.purchase_sub_id ?? ""),
          invoicePackingSub_manufacture_date:
            s.invoiceSub_manufacture_date ?? "",
          invoicePackingSub_expire_date: s.invoiceSub_expire_date ?? "",
          invoicePackingSub_mrp: s.invoiceSub_mrp ?? "",
          invoicePackingSub_item_gst: s.invoiceSub_item_gst ?? "",
        };
      });

      setSubs1(packingRows);
    })();
  }, [id, batchData]);

  const handleChange = (index, key, value) => {
    setSubs1((prev) => {
      const rows = [...prev];
      const row = { ...rows[index], [key]: value };

      // Auto set net weight from box
      if (key === "invoicePackingSub_box_size") {
        const box = cartonboxData?.data?.find(
          (c) => String(c.id) === String(value)
        );
        row.invoicePackingSub_net_weight = box?.cartonbox_weight ?? "";
      }

      rows[index] = row;
      return rows;
    });
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    await savePacking({
      url: INVOICE_API.createpacking,
      method: "POST",
      data: {
        subs1: subs1,
      },
    });

    navigate(-1);
  };

  /* ---------------- LOADING / ERROR ---------------- */

  if (loading || loadingItem || loadingBatch || loadingCarton) {
    return <LoadingBar />;
  }

  if (itemError || batchError || cartonboxError) {
    return <ApiErrorPage />;
  }

  console.log(subs1, "subs1");
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Invoice Packing Details</h2>

      <div className="overflow-auto border rounded-md">
        <Table className="min-w-[1200px]">
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[110px] text-center">Carton No</TableHead>

              <TableHead className="w-[140px]">Box Size</TableHead>

              <TableHead className="w-[200px]">Item</TableHead>

              <TableHead className="w-[160px]">Batch</TableHead>

              <TableHead className="w-[90px] text-right">Qty</TableHead>

              <TableHead className="w-[110px] text-right">Net Wt</TableHead>

              <TableHead className="w-[120px] text-right">Gross Wt</TableHead>

              <TableHead className="w-[120px] text-right">Selling</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {subs1.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-muted/30">
                {/* Carton No */}
                <TableCell className="text-center">
                  <Field
                    value={row.invoicePackingSub_carton_no}
                    onChange={(v) =>
                      handleChange(idx, "invoicePackingSub_carton_no", v)
                    }
                  />
                </TableCell>

                {/* Box Size */}
                <TableCell>
                  <SelectField
                    value={row.invoicePackingSub_box_size}
                    options={cartonboxData?.data || []}
                    optionKey="id"
                    optionLabel="cartonbox"
                    onChange={(v) =>
                      handleChange(idx, "invoicePackingSub_box_size", v)
                    }
                  />
                </TableCell>

                {/* Item */}
                <TableCell>
                  <SelectField
                    value={row.invoicePackingSub_item_id}
                    options={itemData?.data || []}
                    optionKey="id"
                    optionLabel="item_brand_name"
                    disabled
                  />
                </TableCell>

                {/* Batch */}
                <TableCell>
                  <SelectField
                    value={row.invoicePackingSub_batch_no} // "4"
                    options={batchData?.data?.filter(
                      (b) =>
                        String(b.purchaseSub_item_id) ===
                        String(row.invoicePackingSub_item_id)
                    )}
                    optionKey="id" // batch ID
                    optionLabel="purchaseSub_batch_no" // batch number to show (777)
                    disabled
                  />
                </TableCell>

                {/* Qty */}
                <TableCell className="text-right">
                  <Field value={row.invoicePackingSub_qnty} disabled />
                </TableCell>

                {/* Net Weight */}
                <TableCell className="text-right">
                  <Field value={row.invoicePackingSub_net_weight} disabled />
                </TableCell>

                {/* Gross Weight */}
                <TableCell className="text-right">
                  <Field
                    value={row.invoicePackingSub_gross_weight}
                    onChange={(v) =>
                      handleChange(idx, "invoicePackingSub_gross_weight", v)
                    }
                  />
                </TableCell>

                {/* Selling */}
                <TableCell className="text-right">
                  <Field value={row.invoicePackingSub_selling_price} disabled />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : "Save Packing"}
        </Button>
      </div>
    </Card>
  );
};

export default InvoicePackingForm;
