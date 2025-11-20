import React from "react";
import { Table, Button } from "react-bootstrap";

export default function FilteredTable({ rows }) {
  if (!rows || rows.length === 0) return <p>No data.</p>;

  const headers = Object.keys(rows[0]);

  const downloadCSV = () => {
    let csv = headers.join(",") + "\n";
    rows.forEach(row => {
      csv += headers.map(h => row[h]).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_data.csv";
    a.click();
  };

  return (
    <>
      <Button className="mb-2" onClick={downloadCSV}>Download CSV</Button>

      <Table bordered striped hover>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td key={h}>{row[h]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
