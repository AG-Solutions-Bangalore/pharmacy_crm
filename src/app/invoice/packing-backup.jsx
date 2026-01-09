import ApiErrorPage from "@/components/api-error/api-error";
import PageHeader from "@/components/common/page-header";
import LoadingBar from "@/components/loader/loading-bar";
import { Card } from "@/components/ui/card";
import { INVOICE_API } from "@/constants/apiConstants";
import useMasterQueries from "@/hooks/useMasterQueries";
import { useApiMutation } from "@/hooks/useApiMutation";
import { FileText } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Field from "@/components/SelectField/Field";
import SelectField from "@/components/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* -------------------- INITIAL STATE -------------------- */
const INITIAL_STATE = { subs: [] };

const InvoiceView = () => {
  const { id } = useParams();
  const { trigger: fetchData, loading, error } = useApiMutation();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [availableItems, setAvailableItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const master = useMasterQueries(["item", "cartonbox"]);
  const { data: itemData } = master.item;
  const { data: cartonboxData } = master.cartonbox;

  const [cartons, setCartons] = useState([]);
  const [activeCartonIndex, setActiveCartonIndex] = useState(0);
  const [newCarton, setNewCarton] = useState({ carton_no: "", box_size: "" });
  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetchData({ url: INVOICE_API.getById(id) });
      const data = res?.data;
      if (!data) return;

      setFormData({
        ...data,
        invoice_date: data.invoice_date
          ? moment(data.invoice_date).format("DD-MM-YYYY")
          : "",
      });

      setAvailableItems(
        data.subs.map((item, index) => ({
          ...item,
          row_id: `${item.purchase_sub_id}_${index}`,
        }))
      );
    })();
  }, [id]);

  const addCarton = () => {
    if (!newCarton.carton_no || !newCarton.box_size) {
      toast.error("Enter Carton No & Box Size");
      return;
    }
    setCartons((prev) => [
      ...prev,
      {
        carton_no: newCarton.carton_no,
        box_size: newCarton.box_size,
        items: [],
      },
    ]);
    setActiveCartonIndex(cartons.length);
    setNewCarton({ carton_no: "", box_size: "" });
  };

  const addItemToCarton = (item) => {
    if (!cartons[activeCartonIndex]) {
      toast.error("Create & select a carton first");
      return;
    }
    const carton = cartons[activeCartonIndex];
    const box = cartonboxData?.data?.find(
      (c) => String(c.id) === String(carton.box_size)
    );

    const row = {
      row_id: item.row_id,
      invoicePackingSub_ref: formData.invoice_ref,
      invoicePackingSub_carton_no: carton.carton_no,
      invoicePackingSub_box_size: carton.box_size,
      invoicePackingSub_item_id: item.invoiceSub_item_id,
      invoicePackingSub_batch_no: item.invoiceSub_batch_no,
      invoicePackingSub_manufacture_date: item.invoiceSub_manufacture_date,
      invoicePackingSub_expire_date: item.invoiceSub_expire_date,
      invoicePackingSub_qnty: item.invoiceSub_qnty,
      invoicePackingSub_mrp: item.invoiceSub_mrp,
      invoicePackingSub_item_gst: item.invoiceSub_item_gst,
      invoicePackingSub_net_weight: box?.cartonbox_weight ?? "",
      invoicePackingSub_gross_weight: "",
      invoicePackingSub_selling_price: item.invoiceSub_selling_rate,
      purchase_sub_id: item.purchase_sub_id,
    };

    setCartons((prev) =>
      prev.map((c, i) =>
        i === activeCartonIndex ? { ...c, items: [...c.items, row] } : c
      )
    );

    setAvailableItems((prev) => prev.filter((i) => i.row_id !== item.row_id));
  };
  const mapPackingToAvailableItem = (row) => ({
    row_id: row.row_id,

    invoiceSub_ref: row.invoicePackingSub_ref,
    invoiceSub_item_id: row.invoicePackingSub_item_id,
    invoiceSub_batch_no: row.invoicePackingSub_batch_no,
    invoiceSub_manufacture_date: row.invoicePackingSub_manufacture_date,
    invoiceSub_expire_date: row.invoicePackingSub_expire_date,
    invoiceSub_qnty: row.invoicePackingSub_qnty,
    invoiceSub_mrp: row.invoicePackingSub_mrp,
    invoiceSub_item_gst: row.invoicePackingSub_item_gst,
    invoiceSub_selling_rate: row.invoicePackingSub_selling_price,

    purchase_sub_id: row.purchase_sub_id,
  });

  const removeItemFromCarton = (row, cartonIndex) => {
    setCartons((prev) =>
      prev.map((c, i) =>
        i === cartonIndex
          ? { ...c, items: c.items.filter((x) => x.row_id !== row.row_id) }
          : c
      )
    );
    setAvailableItems((prev) => [...prev, mapPackingToAvailableItem(row)]);
  };

  const removeCarton = (cartonIndex) => {
    const removedCarton = cartons[cartonIndex];

    const returnedItems = removedCarton.items.map((row) =>
      mapPackingToAvailableItem(row)
    );

    setAvailableItems((prev) => [...prev, ...returnedItems]);
    setCartons((prev) => prev.filter((_, i) => i !== cartonIndex));
    setActiveCartonIndex(0);
  };

  const handleCartonBoxChange = (cartonIndex, value) => {
    const box = cartonboxData?.data?.find(
      (c) => String(c.id) === String(value)
    );
    setCartons((prev) =>
      prev.map((c, i) =>
        i === cartonIndex
          ? {
              ...c,
              box_size: value,
              items: c.items.map((row) => ({
                ...row,
                invoicePackingSub_box_size: value,
                invoicePackingSub_net_weight: box?.cartonbox_weight ?? "",
              })),
            }
          : c
      )
    );
  };

  const handleItemQtyChange = (cartonIndex, row_id, value) => {
    setCartons((prev) =>
      prev.map((c, i) =>
        i === cartonIndex
          ? {
              ...c,
              items: c.items.map((row) =>
                row.row_id === row_id
                  ? { ...row, invoicePackingSub_qnty: value }
                  : row
              ),
            }
          : c
      )
    );
  };
  const filteredAvailableItems = availableItems.filter((item) => {
    const name =
      itemData?.data?.find(
        (i) => String(i.id) === String(item.invoiceSub_item_id)
      )?.item_brand_name || "";

    return name.toLowerCase().includes(searchItem.toLowerCase());
  });
  console.log(cartons, "cartons");
  const handleSubmit = () => {
    if (!formData?.subs?.length) {
      toast.error("No items found");
      return;
    }

    /* --------------------------------------------
     1️⃣ Build REQUIRED quantity map (from subs)
  ---------------------------------------------*/
    const requiredQtyMap = {};

    formData.subs.forEach((sub) => {
      const key = sub.purchase_sub_id;
      const qty = Number(sub.invoiceSub_qnty || 0);

      requiredQtyMap[key] = (requiredQtyMap[key] || 0) + qty;
    });

    /* --------------------------------------------
     2️⃣ Build PACKED quantity map (from cartons)
  ---------------------------------------------*/
    const packedQtyMap = {};

    cartons.forEach((carton) => {
      carton.items.forEach((row) => {
        const key = row.purchase_sub_id;
        const qty = Number(row.invoicePackingSub_qnty || 0);

        packedQtyMap[key] = (packedQtyMap[key] || 0) + qty;
      });
    });

    /* --------------------------------------------
     3️⃣ Compare BOTH maps
  ---------------------------------------------*/
    for (const purchaseSubId in requiredQtyMap) {
      const requiredQty = requiredQtyMap[purchaseSubId] || 0;
      const packedQty = packedQtyMap[purchaseSubId] || 0;

      if (requiredQty !== packedQty) {
        const sub = formData.subs.find(
          (s) => String(s.purchase_sub_id) === String(purchaseSubId)
        );

        toast.error(
          `${sub?.item_brand_name || "Item"} (Batch ${
            sub?.invoiceSub_batch_no
          }) quantity mismatch. Required: ${requiredQty}, Packed: ${packedQty}`
        );
        return; // ⛔ STOP SUBMIT
      }
    }

    /* --------------------------------------------
     ✅ VALID
  ---------------------------------------------*/
    toast.success("All quantities matched successfully!");

    const payload = {
      invoice_id: id,
      cartons,
    };

    console.log("FINAL SUBMIT PAYLOAD", payload);

    // 👉 call submit API here
  };

  if (error) return <ApiErrorPage />;
  if (loading) return <LoadingBar />;

  return (
    <>
      <PageHeader
        icon={FileText}
        title="Invoice Packing"
        rightContent={<Button onClick={handleSubmit}> Create</Button>}
      />
      <Card className="p-4">
        <Tabs defaultValue="packing">
          <TabsList className="grid grid-cols-1">
            <TabsTrigger value="packing">Packing</TabsTrigger>
          </TabsList>
          <TabsContent value="packing" className="pt-4">
            <div className="grid grid-cols-3  gap-4">
              <Card className="p-3 max-h-[600px] overflow-auto ">
                <div className="grid grid-cols-3 gap-3 items-center">
                  <h3 className="text-sm mb-2">
                    Available Items ({filteredAvailableItems.length})
                  </h3>
                  <div className="col-span-2">
                    <Field
                      placeholder="Search item..."
                      value={searchItem}
                      onChange={(val) => setSearchItem(val)}
                      className="border p-2 rounded mb-2 w-full text-sm"
                    />
                  </div>
                </div>

                {filteredAvailableItems.map((item) => (
                  <div
                    key={item.row_id}
                    className="border p-2 rounded mb-2 flex justify-between items-center"
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
                      <div className="text-xs">
                        Qty: {item.invoiceSub_qnty}
                        <span className="ml-2">
                          Batch: {item.invoiceSub_batch_no}
                        </span>
                      </div>
                    </div>
                    <button
                      className="border px-3 py-1 rounded text-xs"
                      onClick={() => addItemToCarton(item)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </Card>

              <Card className="p-3 space-y-4 max-h-[600px] overflow-auto col-span-2">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <Field
                    value={newCarton.carton_no}
                    onChange={(val) =>
                      setNewCarton((p) => ({ ...p, carton_no: val }))
                    }
                    placeholder="Carton No"
                  />
                  <SelectField
                    value={newCarton.box_size}
                    options={cartonboxData?.data || []}
                    optionKey="id"
                    optionLabel="cartonbox"
                    onChange={(v) =>
                      setNewCarton((p) => ({ ...p, box_size: v }))
                    }
                  />

                  <Button
                    className="border px-3 py-2 rounded mb-2"
                    onClick={addCarton}
                  >
                    + Add Carton
                  </Button>
                </div>

                {cartons.map((carton, cartonIndex) => (
                  <Card
                    key={cartonIndex}
                    className={`p-2 cursor-pointer ${
                      cartonIndex === activeCartonIndex ? "border-primary" : ""
                    }`}
                    onClick={() => setActiveCartonIndex(cartonIndex)}
                  >
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span>{cartonIndex + 1}</span>
                      <button
                        className="text-red-500 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCarton(cartonIndex);
                        }}
                      >
                        Remove Carton
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {/* Carton No */}
                      <Field
                        value={carton.carton_no}
                        onChange={(val) =>
                          setCartons((prev) =>
                            prev.map((c, i) =>
                              i === cartonIndex ? { ...c, carton_no: val } : c
                            )
                          )
                        }
                        placeholder="Carton No"
                      />

                      {/* Box Size */}
                      <SelectField
                        value={carton.box_size}
                        options={cartonboxData?.data || []}
                        optionKey="id"
                        optionLabel="cartonbox"
                        onChange={(v) => handleCartonBoxChange(cartonIndex, v)}
                      />
                    </div>

                    {carton.items.length > 0 && (
                      <div className="overflow-auto text-xs">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="border px-1">Item</th>
                              <th className="border px-1">Batch</th>
                              <th className="border px-1">Mfg Date</th>
                              <th className="border px-1">Exp Date</th>
                              <th className="border px-1">Qty</th>
                              <th className="border px-1">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {carton.items.map((row) => (
                              <tr key={row.row_id} className="border-b">
                                <td className="border px-1">
                                  {
                                    itemData?.data?.find(
                                      (i) =>
                                        String(i.id) ===
                                        String(row.invoicePackingSub_item_id)
                                    )?.item_brand_name
                                  }
                                </td>
                                <td className="border px-1">
                                  {row.invoicePackingSub_batch_no}
                                </td>
                                <td className="border px-1">
                                  {moment(
                                    row.invoicePackingSub_manufacture_date
                                  ).format("DD-MM-YYYY")}
                                </td>
                                <td className="border px-1">
                                  {moment(
                                    row.invoicePackingSub_expire_date
                                  ).format("DD-MM-YYYY")}
                                </td>
                                <td className="border px-1">
                                  <input
                                    type="number"
                                    value={row.invoicePackingSub_qnty}
                                    className="border p-1 rounded w-full text-xs"
                                    onChange={(e) =>
                                      handleItemQtyChange(
                                        cartonIndex,
                                        row.row_id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>

                                <td className="border px-1">
                                  <button
                                    className="text-red-500 text-xs"
                                    onClick={() =>
                                      removeItemFromCarton(row, cartonIndex)
                                    }
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Card>
                ))}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

export default InvoiceView;
