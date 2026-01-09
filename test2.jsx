"use client";

import ApiErrorPage from "@/components/api-error/api-error";
import PageHeader from "@/components/common/page-header";
import LoadingBar from "@/components/loader/loading-bar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONTRACT_API, INVOICE_API } from "@/constants/apiConstants";
import useMasterQueries from "@/hooks/useMasterQueries";
import { useApiMutation } from "@/hooks/useApiMutation";
import { FileText } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* -------------------- VIEW FIELD -------------------- */
const ViewField = ({ label, value }) => (
  <div className="space-y-1">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    <div className="text-sm font-medium border rounded-md px-3 py-2 bg-muted">
      {value || "-"}
    </div>
  </div>
);

/* -------------------- INITIAL STATE -------------------- */
const INITIAL_STATE = {
  subs: [],
};

const InvoiceView = () => {
  const { id } = useParams();
  const { trigger: fetchData, loading, error } = useApiMutation();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [availableItems, setAvailableItems] = useState([]);
  const [activeCartonIndex, setActiveCartonIndex] = useState(0);
  const [currentCarton, setCurrentCarton] = useState({
    invoicePackingSub_carton_no: "",
    invoicePackingSub_box_size: "",
  });
  const [subs1, setSubs1] = useState([]);

  const [cartons, setCartons] = useState([
    {
      invoicePackingSub_ref: "",
      invoicePackingSub_carton_no: "",
      invoicePackingSub_box_size: "",
      items: [],
    },
  ]);
  console.log(availableItems, "availableItems");
  console.log(activeCartonIndex, "activeCartonIndex");
  console.log(cartons, "cartons");
  const master = useMasterQueries(["item", "activepurchaseother"]);

  const { data: itemData } = master.item;
  const { data: activePurchaseItemOther } = master.activepurchaseother;

  useEffect(() => {
    if (!id) return;

    (async () => {
      const res = await fetchData({
        url: INVOICE_API.getById(id),
      });

      const data = res?.data;
      if (!data) return;

      setFormData({
        ...data,
        invoice_date: data.invoice_date
          ? moment(data.invoice_date).format("DD-MM-YYYY")
          : "",
        contract_date: data.contract_date
          ? moment(data.contract_date).format("DD-MM-YYYY")
          : "",
      });
      setAvailableItems(
        formData.subs.map((item, index) => ({
          ...item,
          row_id: `${item.purchase_sub_id}_${index}`,
        }))
      );
    })();
  }, [id]);
  const addCarton = () => {
    setCartons((prev) => [
      ...prev,
      {
        invoicePackingSub_ref: "",
        invoicePackingSub_carton_no: "",
        invoicePackingSub_box_size: "",
        items: [],
      },
    ]);
  };

  const addItemToCarton = (item) => {
    if (
      !currentCarton.invoicePackingSub_carton_no ||
      !currentCarton.invoicePackingSub_box_size
    ) {
      alert("Enter Carton No & Box Size first");
      return;
    }

    const packingRow = {
      row_id: item.row_id,

      invoicePackingSub_ref: formData.invoice_ref,
      invoicePackingSub_carton_no: currentCarton.invoicePackingSub_carton_no,
      invoicePackingSub_box_size: currentCarton.invoicePackingSub_box_size,

      invoicePackingSub_item_id: item.invoiceSub_item_id,
      invoicePackingSub_batch_no: item.invoiceSub_batch_no,
      invoicePackingSub_manufacture_date: item.invoiceSub_manufacture_date,
      invoicePackingSub_expire_date: item.invoiceSub_expire_date,
      invoicePackingSub_qnty: item.invoiceSub_qnty,
      invoicePackingSub_mrp: item.invoiceSub_mrp,
      invoicePackingSub_item_gst: item.invoiceSub_item_gst,
      invoicePackingSub_net_weight: item.invoiceSub_net_weight,
      invoicePackingSub_gross_weight: item.invoiceSub_gross_weight,
      invoicePackingSub_selling_price: item.invoiceSub_selling_rate,

      purchase_sub_id: item.purchase_sub_id,
    };

    // 👉 ADD TO RIGHT SIDE
    setSubs1((prev) => [...prev, packingRow]);

    // 👉 REMOVE FROM LEFT SIDE
    setAvailableItems((prev) => prev.filter((i) => i.row_id !== item.row_id));
  };

  const removeItemFromCarton = (row) => {
    setSubs1((prev) => prev.filter((i) => i.row_id !== row.row_id));

    setAvailableItems((prev) => [...prev, row]);
  };

  const canAdd =
    cartons[activeCartonIndex]?.invoicePackingSub_carton_no &&
    cartons[activeCartonIndex]?.invoicePackingSub_box_size;

  if (error) {
    return <ApiErrorPage />;
  }

  if (loading) {
    return <LoadingBar />;
  }
  console.log(availableItems, "availableItems");
  return (
    <>
      <PageHeader icon={FileText} title="Invoice Packing" />

      <Card className="p-4 space-y-6">
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="form">Invoice Details</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="packing">Packing</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="pt-4">
            {/* ---------------- BASIC INFO ---------------- */}
            <div className="grid md:grid-cols-4 gap-4">
              <ViewField label="Contract Ref" value={formData.contract_ref} />
              <ViewField label="Invoice No" value={formData.invoice_no} />
              <ViewField label="Invoice Ref" value={formData.invoice_ref} />
              <ViewField label="Invoice Date" value={formData.invoice_date} />
            </div>

            {/* ---------------- PARTY DETAILS ---------------- */}
            <div className="grid md:grid-cols-3 gap-4">
              <ViewField label="Buyer" value={formData.invoice_buyer} />
              <ViewField label="Consignee" value={formData.invoice_consignee} />
              <ViewField label="Bank" value={formData.invoice_consig_bank} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <ViewField
                label="Buyer Address"
                value={formData.invoice_buyer_add}
              />
              <ViewField
                label="Consignee Address"
                value={formData.invoice_consignee_add}
              />
              <ViewField
                label="Bank Address"
                value={formData.invoice_consig_bank_address}
              />
            </div>

            {/* ---------------- LOGISTICS ---------------- */}
            <div className="grid md:grid-cols-4 gap-4">
              <ViewField
                label="Port of Loading"
                value={formData.invoice_loading}
              />
              <ViewField
                label="Destination Port"
                value={formData.invoice_destination_port}
              />
              <ViewField
                label="Discharge Port"
                value={formData.invoice_discharge}
              />
              <ViewField label="CIF" value={formData.invoice_cif} />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <ViewField
                label="Destination Country"
                value={formData.invoice_destination_country}
              />
              <ViewField
                label="Container Size"
                value={formData.invoice_container_size}
              />
              <ViewField label="GR Code" value={formData.invoice_gr_code} />
              <ViewField label="LUT Code" value={formData.invoice_lut_code} />
            </div>

            {/* ---------------- FINANCIAL ---------------- */}
            <div className="grid md:grid-cols-4 gap-4">
              <ViewField
                label="Dollar Rate"
                value={formData.invoice_dollar_rate}
              />
              <ViewField
                label="Payment Terms"
                value={formData.invoice_payment_terms}
              />
              <ViewField label="Status" value={formData.invoice_status} />
              <ViewField
                label="Vessel / Flight No"
                value={formData.invoice_vessel_flight_no}
              />
            </div>

            <ViewField label="Remarks" value={formData.invoice_remarks} />
          </TabsContent>
          <TabsContent value="items" className="pt-4 space-y-4">
            <Card className="p-0 overflow-hidden rounded-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>MFG</TableHead>
                    <TableHead>EXP</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>MRP</TableHead>
                    <TableHead>Selling</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {formData.subs?.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        {itemData?.data?.find(
                          (i) => String(i.id) === String(row.invoiceSub_item_id)
                        )?.item_brand_name || "-"}
                      </TableCell>

                      <TableCell>
                        {activePurchaseItemOther?.data?.find(
                          (b) =>
                            String(b.id) === String(row.invoiceSub_batch_no)
                        )?.purchaseSub_batch_no || "-"}
                      </TableCell>

                      <TableCell>
                        {row.invoiceSub_manufacture_date
                          ? moment(row.invoiceSub_manufacture_date).format(
                              "DD-MM-YYYY"
                            )
                          : "-"}
                      </TableCell>

                      <TableCell>
                        {row.invoiceSub_expire_date
                          ? moment(row.invoiceSub_expire_date).format(
                              "DD-MM-YYYY"
                            )
                          : "-"}
                      </TableCell>

                      <TableCell>{row.invoiceSub_qnty || "-"}</TableCell>
                      <TableCell>{row.invoiceSub_mrp || "-"}</TableCell>
                      <TableCell>
                        {row.invoiceSub_selling_rate || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="packing" className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              {/* LEFT – AVAILABLE ITEMS */}
              {/* LEFT – AVAILABLE ITEMS */}
              <Card className="p-3">
                <h3 className="font-semibold mb-2">
                  Available Items
                  <span className="text-xs ml-2 text-muted-foreground">
                    (Adding to Carton {activeCartonIndex + 1})
                  </span>
                </h3>

                {availableItems.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No items available
                  </div>
                )}

                {availableItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="border p-2 rounded mb-2 text-sm flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">
                        {
                          itemData?.data?.find(
                            (i) =>
                              String(i.id) === String(item.invoiceSub_item_id)
                          )?.item_brand_name
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Qty: {item.invoiceSub_qnty}
                      </div>
                    </div>

                    <button
                      disabled={!canAdd}
                      className="border px-2 py-1 rounded text-xs disabled:opacity-50"
                      onClick={() => addItemToCarton(item, activeCartonIndex)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </Card>

              {/* RIGHT – CARTONS */}
              <div className="space-y-4">
                {cartons.map((carton, cartonIndex) => (
                  <Card
                    key={cartonIndex}
                    className={`p-3 space-y-2 cursor-pointer ${
                      activeCartonIndex === cartonIndex ? "border-primary" : ""
                    }`}
                    onClick={() => setActiveCartonIndex(cartonIndex)}
                  >
                    {" "}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className="border p-2 rounded"
                        placeholder="Carton No"
                        value={carton.invoicePackingSub_carton_no}
                        onChange={(e) => {
                          const updated = [...cartons];
                          updated[cartonIndex].invoicePackingSub_carton_no =
                            e.target.value;
                          setCartons(updated);
                        }}
                      />

                      <input
                        className="border p-2 rounded"
                        placeholder="Box Size"
                        value={carton.invoicePackingSub_box_size}
                        onChange={(e) => {
                          const updated = [...cartons];
                          updated[cartonIndex].invoicePackingSub_box_size =
                            e.target.value;
                          setCartons(updated);
                        }}
                      />
                    </div>
                    {/* ITEMS INSIDE CARTON */}
                    {carton.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="border p-2 rounded flex justify-between text-sm"
                      >
                        <span>
                          {
                            itemData?.data?.find(
                              (i) =>
                                String(i.id) ===
                                String(item.invoicePackingSub_item_id)
                            )?.item_brand_name
                          }
                        </span>

                        <button
                          className="text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItemFromCarton(item, cartonIndex);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </Card>
                ))}

                <button
                  onClick={addCarton}
                  className="border px-3 py-2 rounded w-full"
                >
                  + Add Carton
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

export default InvoiceView;
"invoiceSub_ref": "CSEI\/TESTERAGILE25-268",
                "invoiceSub_item_id": 1,
                "purchase_sub_id": 1,
                "invoiceSub_qnty": "2.00",
                "invoiceSub_mrp": "24.00",
                "invoiceSub_selling_rate": "4.00",
                "invoiceSub_item_gst": "4.00",
                "invoiceSub_batch_no": "1",
                "invoiceSub_manufacture_date": "2026-01-06",
                "invoiceSub_expire_date": "2026-01-07",
                "item_hsn_code": "30049099",
                "item_brand_name": "ACNESTAR GEL (20GM)",
                "item_generic_name": "CLINDAMYCIN(1%W\/W) + NICOTINAMIDE(4%W\/W)",
                "item_company_name": "MANKIND"