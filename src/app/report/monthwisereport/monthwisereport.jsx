"use client";

import Field from "@/components/SelectField/Field";
import SelectField from "@/components/SelectField/SelectField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { REPORT_API } from "@/constants/apiConstants";
import { useApiMutation } from "@/hooks/useApiMutation";
import { Download, Eye, FileSpreadsheet, Printer } from "lucide-react";
import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import { Calendar22 } from "@/components/ui/calendar-22";
import useMasterQueries from "@/hooks/useMasterQueries";
import LoadingBar from "@/components/loader/loading-bar";

const MonthWiseReport = () => {
  const { trigger, loading } = useApiMutation();
  const printRef = useRef();
  const [fromDate, setFromDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [purchaseVendorId, setPurchaseVendorId] = useState("");
  const [purchaseItemId, setPurchaseItemId] = useState("");
  const [reportData, setReportData] = useState([]);

  const master = useMasterQueries(["vendor", "item"]);

  const { data: vendorData } = master.vendor;
  const { data: itemData } = master.item;

  const groupedByVendor = useMemo(() => {
    return reportData.reduce((acc, row) => {
      const vendor = row.vendor_name || "Unknown Vendor";
      acc[vendor] = acc[vendor] || [];
      acc[vendor].push(row);
      return acc;
    }, {});
  }, [reportData]);

  /* ---------------- Fetch Report ---------------- */
  const fetchReport = async () => {
    try {
      const payload = {
        from_date: fromDate,
        to_date: toDate,
        purchase_vendor_id: purchaseVendorId || "",
        purchase_item_id: purchaseItemId || "",
      };

      const res = await trigger({
        url: REPORT_API.monthwisereport,
        method: "POST",
        data: payload,
      });

      if (!res?.data?.length) {
        toast.error("No data found");
        setReportData([]);
        return;
      }

      setReportData(res.data);
      toast.success("Report loaded successfully");
    } catch (err) {
      toast.error(err?.message || "Failed to fetch report");
    }
  };

  const downloadExcel = () => {
    if (!reportData.length) {
      toast.error("No data to download");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const rows = [];

    Object.entries(groupedByBranch).forEach(([branch, data]) => {
      rows.push({ Branch: `Branch: ${branch}` });

      data.forEach((row) => {
        rows.push({
          "Invoice No": row.invoice_no,
          Buyer: row.invoice_buyer,
          "SB No": row.invoice_sb_no,
          "BL No": row.invoice_bl_no,
          "BL Date": moment(row.invoice_bl_date).format("DD-MM-YYYY"),
          Product: row.invoice_product,
          "I Value USD": row.invoice_i_value_usd,
          "I Value INR": row.invoice_i_value_inr,
          "FOB USD": row.invoice_fob_usd,
          "FOB INR": row.invoice_fob_inr,
          MEIS: row.meis,
          Drawback: row.drawback,
          "Service Tax": row.stax,
        });
      });

      rows.push({});
    });

    const sheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, sheet, "Duty Drawback");

    const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    saveAs(new Blob([buffer]), `Duty_Drawback_${fromDate}_to_${toDate}.xlsx`);
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Month Wise Report",
    pageStyle: `
      @page {
      size: auto;
 margin: 3mm 3mm 3mm 3mm;
        border border-black: 0px solid black;
      
    }
    @media print {
      body {
        border border-black: 0px solid red;
        margin: 1mm;
        padding: 1mm 1mm 1mm 1mm;
        min-height: 100vh;
      }
      .print-hide {
        display: none;
      }
     
    }
    `,
  });
  const grandTotals = useMemo(() => {
    return reportData.reduce(
      (totals, row) => {
        totals.qnty += Number(row.purchaseSub_qnty || 0);
        totals.rate += Number(row.purchaseSub_rate || 0);
        return totals;
      },
      { qnty: 0, rate: 0 }
    );
  }, [reportData]);

  return (
    <>
      {loading && <LoadingBar />}

      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Month Wise Report</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:sm:grid-cols-6 gap-4">
          <Calendar22
            label="From Date"
            value={fromDate}
            onChange={setFromDate}
          />

          <Calendar22 label="To Date" value={toDate} onChange={setToDate} />

          <SelectField
            label="Vendor"
            value={purchaseVendorId}
            onChange={setPurchaseVendorId}
            options={vendorData?.data}
            optionKey="id"
            optionLabel="vendor_name"
          />

          <SelectField
            label="Item"
            value={purchaseItemId}
            onChange={setPurchaseItemId}
            options={itemData?.data}
            optionKey="id"
            optionLabel="item_company_name"
          />

          <div className="flex gap-2 mt-6">
            <Button onClick={fetchReport} disabled={loading}>
              <Eye className="w-4 h-4 mr-1" /> View
            </Button>

            <Button
              variant="outline"
              onClick={downloadExcel}
              disabled={!reportData.length}
            >
              <Download className="w-4 h-4 mr-1" /> Excel
            </Button>

            {reportData.length > 0 && (
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-1" /> Print
              </Button>
            )}
          </div>
        </div>
      </Card>

      {reportData.length > 0 && (
        <div ref={printRef} className="mt-6 overflow-x-auto">
          <div className="hidden print:block">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl">Month Wise Report</h2>
              <div className="flex">
                <div className="mr-2">
                  From :{moment(fromDate).format("DD MMM YYYY")}
                </div>
                <div>To :{moment(toDate).format("DD MMM YYYY")}</div>
              </div>
            </div>
          </div>
          <table className="w-full text-xs border border-black">
            <tbody>
              {Object.entries(groupedByVendor).map(([vendor, rows]) => {
                const vendorTotalQty = rows.reduce(
                  (sum, r) => sum + Number(r.purchaseSub_qnty || 0),
                  0
                );

                const vendorTotalRate = rows.reduce(
                  (sum, r) => sum + Number(r.purchaseSub_rate || 0),
                  0
                );

                return (
                  <React.Fragment key={vendor}>
                    <tr>
                      <td
                        colSpan={8}
                        className="border border-black px-2 py-2 font-bold bg-gray-200"
                      >
                        Vendor: {vendor}
                      </td>
                    </tr>

                    <tr className="bg-gray-100">
                      <th className="border border-black px-2 py-1">
                        Purchase Date
                      </th>
                      <th className="border border-black  px-2 py-1">Item</th>
                      <th className="border border-black px-2 py-1">Batch</th>
                      <th className="border border-black px-2 py-1">
                        MFG Date
                      </th>
                      <th className="border border-black px-2 py-1">
                        EXP Date
                      </th>
                      <th className="border border-black px-2 py-1 text-right">
                        Qty
                      </th>
                      <th className="border border-black px-2 py-1 text-right">
                        Rate
                      </th>
                    </tr>

                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td className="border border-black px-2">
                          {moment(row.purchase_date).format("DD-MM-YYYY")}
                        </td>
                        <td className="border border-black px-2">
                          {row.item_brand_name}
                        </td>
                        <td className="border border-black px-2">
                          {row.purchaseSub_batch_no}
                        </td>
                        <td className="border border-black px-2">
                          {moment(row.purchaseSub_manufacture_date).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td className="border border-black px-2">
                          {moment(row.purchaseSub_expire_date).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td className="border border-black px-2 text-right">
                          {Number(row.purchaseSub_qnty).toFixed(2)}
                        </td>
                        <td className="border border-black px-2 text-right">
                          {Number(row.purchaseSub_rate).toFixed(2)}
                        </td>
                      </tr>
                    ))}

                    <tr className="font-semibold bg-gray-50">
                      <td
                        colSpan={5}
                        className="border border-black px-2 text-right"
                      >
                        Vendor Total
                      </td>
                      <td className="border border-black px-2 text-right">
                        {vendorTotalQty.toFixed(2)}
                      </td>
                      <td className="border border-black px-2 text-right">
                        {vendorTotalRate.toFixed(2)}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}

              <tr className="font-bold bg-gray-200 ">
                <td colSpan={5} className="border border-black px-2 text-right">
                  Grand Total
                </td>
                <td className="border border-black px-2 text-right">
                  {grandTotals.qnty.toFixed(2)}
                </td>
                <td className="border border-black px-2 text-right">
                  {grandTotals.rate.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MonthWiseReport;
