import React, { useRef, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Field from "@/components/SelectField/Field";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { REPORT_API } from "@/constants/apiConstants";
import {
  Calendar,
  Download,
  Eye,
  FileSpreadsheet,
  Printer,
  Package,
} from "lucide-react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";

const StockReport = () => {
  const { trigger, loading } = useApiMutation();
  const [fromDate, setFromDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));

  const [reportData, setReportData] = useState([]);
  const printRef = useRef();

  // Group data by brand name
  const groupedByBrand = reportData.reduce((acc, row) => {
    if (!acc[row.item_brand_name]) {
      acc[row.item_brand_name] = [];
    }
    acc[row.item_brand_name].push(row);
    return acc;
  }, {});

  const downloadExcel = (data, fileName) => {
    const workbook = XLSX.utils.book_new();

    // Create worksheet data with brand grouping
    const worksheetData = [];

    Object.entries(data).forEach(([brandName, rows]) => {
      // Add brand header row
      worksheetData.push({
        Brand: `Brand: ${brandName}`,
        "Generic Name": "",
        Company: "",
        "Batch No": "",
        "Opening Stock": "",
        Purchase: "",
        Sale: "",
        "Closing Stock": "",
      });

      // Add brand data rows
      rows.forEach((row) => {
        worksheetData.push({
          Brand: "",
          "Generic Name": row.item_generic_name,
          Company: row.item_company_name,
          "Batch No": row.batch_no,
          "Opening Stock": row.opening_stock,
          Purchase: row.purchase,
          Sale: row.sale,
          "Closing Stock": row.closing_stock,
        });
      });

      // Calculate totals for this brand
      const totals = rows.reduce(
        (sum, row) => ({
          opening: sum.opening + parseFloat(row.opening_stock || 0),
          purchase: sum.purchase + parseFloat(row.purchase || 0),
          sale: sum.sale + parseFloat(row.sale || 0),
          closing: sum.closing + parseFloat(row.closing_stock || 0),
        }),
        { opening: 0, purchase: 0, sale: 0, closing: 0 }
      );

      // Add total row
      worksheetData.push({
        Brand: "",
        "Generic Name": "",
        Company: "",
        "Batch No": "Total",
        "Opening Stock": totals.opening.toFixed(2),
        Purchase: totals.purchase.toFixed(2),
        Sale: totals.sale.toFixed(2),
        "Closing Stock": totals.closing.toFixed(2),
      });

      // Add empty row between brands
      worksheetData.push({
        Brand: "",
        "Generic Name": "",
        Company: "",
        "Batch No": "",
        "Opening Stock": "",
        Purchase: "",
        Sale: "",
        "Closing Stock": "",
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 30 }, // Brand
      { wch: 40 }, // Generic Name
      { wch: 25 }, // Company
      { wch: 15 }, // Batch No
      { wch: 15 }, // Opening Stock
      { wch: 15 }, // Purchase
      { wch: 15 }, // Sale
      { wch: 15 }, // Closing Stock
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `${fileName}.xlsx`);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Stock Report",
  });

  const fetchReport = async () => {
    try {
      const res = await trigger({
        url: REPORT_API.stockreport,
        method: "POST",
        data: {
          from_date: fromDate,
          to_date: toDate,
        },
      });

      if (!res?.data?.length) {
        toast.error("No data found");
        setReportData([]);
        return;
      }

      setReportData(res.data);
      toast.success("Report loaded");
    } catch (err) {
      toast.error(err?.message || "Failed to fetch report");
    }
  };

  const handleExcelDownload = () => {
    if (!reportData.length) {
      toast.error("No data to download");
      return;
    }

    downloadExcel(groupedByBrand, "Stock_Report");
  };

  // Calculate totals for each brand
  const calculateBrandTotals = (rows) => {
    return rows.reduce(
      (sum, row) => ({
        opening: sum.opening + parseFloat(row.opening_stock || 0),
        purchase: sum.purchase + parseFloat(row.purchase || 0),
        sale: sum.sale + parseFloat(row.sale || 0),
        closing: sum.closing + parseFloat(row.closing_stock || 0),
      }),
      { opening: 0, purchase: 0, sale: 0, closing: 0 }
    );
  };

  return (
    <>
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Stock Report</h2>
            <p className="text-sm text-muted-foreground">
              From month start to today
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Field type="date" value={fromDate} onChange={setFromDate} />

          <Field type="date" value={toDate} onChange={setToDate} />

          <div className="space-x-4 col-span-2">
            <Button onClick={fetchReport} disabled={loading} className="gap-2">
              <Eye className="w-4 h-4" />
              View
            </Button>

            <Button
              variant="outline"
              onClick={handleExcelDownload}
              disabled={!reportData.length}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </Button>
            {reportData.length > 0 && (
              <Button variant="outline" onClick={handlePrint} className="gap-2">
                <Printer className="w-4 h-4" />
                Print
              </Button>
            )}
          </div>
        </div>
      </Card>

      {reportData.length > 0 && (
        <div ref={printRef} className="mt-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse border border-black">
            <tbody>
              {Object.entries(groupedByBrand).map(
                ([brandName, rows], brandIndex) => {
                  const totals = calculateBrandTotals(rows);

                  return (
                    <React.Fragment key={brandIndex}>
                      {/* Brand Header Row - Above Table Headers */}
                      <tr>
                        <td
                          colSpan={8}
                          className="border border-black px-2 py-2 font-semibold bg-gray-200 text-left"
                        >
                          Brand: {brandName}
                        </td>
                      </tr>

                      {/* Table Headers */}
                      <tr className="bg-gray-100">
                        <th className="border border-black px-2 py-2">
                          Generic Name
                        </th>
                        <th className="border border-black px-2 py-2">
                          Company
                        </th>
                        <th className="border border-black px-2 py-2">
                          Batch No
                        </th>
                        <th className="border border-black px-2 py-2">
                          Opening Stock
                        </th>
                        <th className="border border-black px-2 py-2">
                          Purchase
                        </th>
                        <th className="border border-black px-2 py-2">Sale</th>
                        <th className="border border-black px-2 py-2">
                          Closing Stock
                        </th>
                      </tr>

                      {/* Brand Data Rows */}
                      {rows.map((row, i) => (
                        <tr
                          key={`${brandIndex}-${i}`}
                          className="even:bg-gray-50"
                        >
                          <td className="border border-black px-2 py-1">
                            {row.item_generic_name}
                          </td>
                          <td className="border border-black px-2 py-1">
                            {row.item_company_name}
                          </td>
                          <td className="border border-black px-2 py-1 text-center">
                            {row.batch_no}
                          </td>
                          <td className="border border-black px-2 py-1 text-right">
                            {row.opening_stock}
                          </td>
                          <td className="border border-black px-2 py-1 text-right">
                            {row.purchase}
                          </td>
                          <td className="border border-black px-2 py-1 text-right">
                            {row.sale}
                          </td>
                          <td className="border border-black px-2 py-1 text-right">
                            {row.closing_stock}
                          </td>
                        </tr>
                      ))}

                      {/* Total Row for this brand */}
                      <tr className="bg-gray-300 font-semibold">
                        <td
                          className="border border-black px-2 py-1"
                          colSpan={3}
                        >
                          Total
                        </td>
                        <td className="border border-black px-2 py-1 text-right">
                          {totals.opening.toFixed(2)}
                        </td>
                        <td className="border border-black px-2 py-1 text-right">
                          {totals.purchase.toFixed(2)}
                        </td>
                        <td className="border border-black px-2 py-1 text-right">
                          {totals.sale.toFixed(2)}
                        </td>
                        <td className="border border-black px-2 py-1 text-right">
                          {totals.closing.toFixed(2)}
                        </td>
                      </tr>

                      {/* Spacing between brands */}
                      {brandIndex < Object.keys(groupedByBrand).length - 1 && (
                        <tr>
                          <td colSpan={7} className="py-2"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default StockReport;
