"use client";

import { Tabs } from "antd";
import "antd/dist/reset.css"; // Next.js 13+ style reset
import { useState, useEffect } from "react";
import Notes from "./components/notes";
import SavedWordList from "./components/saved-word-list";
import TestSection from "./components/test-section";

export default function Home() {
  const [wordExplanations, setWordExplanations] = useState({});

  // Анх ачаалах
  useEffect(() => {
    const storedExplanations = JSON.parse(
      localStorage.getItem("wordExplanations") || "{}"
    );
    setWordExplanations(storedExplanations);
  }, []);

  // Word-ийг update хийх function
  const updateWordExplanations = (updated) => {
    setWordExplanations(updated);
    localStorage.setItem("wordExplanations", JSON.stringify(updated));
  };

  const items = [
    {
      key: "1",
      label: "📝 Ажлын талбар",
      children: (
        <Notes
          wordExplanations={wordExplanations}
          setWordExplanations={updateWordExplanations}
        />
      ),
    },
    {
      key: "2",
      label: "📚 Шинэ үгнүүд",
      children: (
        <SavedWordList
          wordExplanations={wordExplanations}
          setWordExplanations={updateWordExplanations}
        />
      ),
    },
    {
      key: "3",
      label: "🧠 Тест бөглөх",
      children: <TestSection wordExplanations={wordExplanations} />,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarGutter={16}
          style={{ height: "100%" }} // Tabs өөрөө өндөр авах
        />
      </div>
    </main>
  );
}
