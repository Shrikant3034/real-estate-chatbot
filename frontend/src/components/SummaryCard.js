import React from "react";
import { Card } from "react-bootstrap";

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <Card className="p-3 mb-3">
      <h4>Summary</h4>
      <p>{summary}</p>
    </Card>
  );
}
