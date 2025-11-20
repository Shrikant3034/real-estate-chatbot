import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="d-flex gap-2">
      <Form.Control
        placeholder="Ask something like: Analyze Wakad"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={send}>Send</Button>
    </div>
  );
}
