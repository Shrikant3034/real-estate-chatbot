import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import ChatInput from "./components/ChatInput";
import SummaryCard from "./components/SummaryCard";
import TrendChart from "./components/TrendChart";
import FilteredTable from "./components/FilteredTable";
import { uploadExcel, queryBackend } from "./utils/api";

function App() {
  const [summary, setSummary] = useState("");
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [metric, setMetric] = useState("price");

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadExcel(file);
      alert("File uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleQuery = async (query) => {
    setSummary("Loading...");

    try {
      const res = await queryBackend(query, metric);
      setSummary(res.summary);
      setChartData(res.chart);
      setTableData(res.table);
    } catch (err) {
      setSummary("Something went wrong. Check backend.");
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-3 mb-3">
        <h2>Real Estate Analysis Chatbot</h2>

        <Form.Group className="my-3">
          <Form.Label>Upload Excel</Form.Label>
          <Form.Control type="file" onChange={handleExcelUpload} />
        </Form.Group>

        <Form.Select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="mb-3"
        >
          <option value="price">Price</option>
          <option value="demand">Demand</option>
        </Form.Select>

        <ChatInput onSend={handleQuery} />
      </Card>

      <SummaryCard summary={summary} />

      <Card className="p-3 my-3">
        <h4>Trend Chart</h4>
        <TrendChart data={chartData} label={metric} />
      </Card>

      <Card className="p-3 mb-3">
        <h4>Filtered Data</h4>
        <FilteredTable rows={tableData} />
      </Card>
    </Container>
  );
}

export default App;
