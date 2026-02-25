import React from "react";
import ReactMarkdown from "react-markdown";

const markdownText = `
# 🚀 Internship Management System

This project is built using **React** and **Tailwind CSS**.

## ✨ Features
- Student Dashboard
- Company Dashboard
- Upload CV
- Apply to internships

## 🛠 Tech Stack
- React
- Tailwind
- Node.js
- MongoDB

> This project was created for learning and practice purposes.
`;

export default function Markdown() {
  return (
    <div className="prose max-w-none p-6">
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
}

