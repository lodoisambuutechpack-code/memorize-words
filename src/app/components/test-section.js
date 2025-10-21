"use client";

import { useState } from "react";
import { Card, Select, Input, Button, Typography } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import GradientHeart from "./hearth";
import { Toast } from "./toast";

const { Text } = Typography;
const { Option } = Select;

const cheerWords = [
  "Ёооё лаажийн шдээ! 😄",
  "Мундаг шүү! 🥰",
  "Чи минь хамгийн хөөрхөн! 🌟",
  "Гайхалтай, ямар гоё шаачваа! 💪",
  "Пүү лаажийн шдээ хайраа! 🏆",
  "Гал2! 🔥",
  "Чи минь ухаантай шүү! 😚",
  "Чи минь хүчтэй болжийн шүү! 🥰",
  "Миний сайхнаа! 🎉",
  "Пүүү, ийм мундаг! 🌟",
  "Хөөрхөн шдээ! 😘",
  "Ухаантай охин шүү! 😇",
];

export default function TestSection({ wordExplanations }) {
  const words = Object.keys(wordExplanations);
  const [selectedWords, setSelectedWords] = useState([]);
  const [answers, setAnswers] = useState({});
  const [checkedWords, setCheckedWords] = useState({});
  const [errorWords, setErrorWords] = useState({});
  const [toast, setToast] = useState(null);

  const handleInputChange = (word, value) => {
    setAnswers((prev) => ({ ...prev, [word]: value }));
    setCheckedWords((prev) => ({ ...prev, [word]: false }));
    setErrorWords((prev) => ({ ...prev, [word]: false }));
  };

  const handleCheck = (word) => {
    const userInput = (answers[word] || "").trim().toLowerCase();
    const correctAnswer = (wordExplanations[word] || "").trim().toLowerCase();
    if (!userInput) {
      setToast("Хариулт бичнэ үү!");
      return;
    }
    if (userInput === correctAnswer) {
      const randomCheer =
        cheerWords[Math.floor(Math.random() * cheerWords.length)];
      setCheckedWords((prev) => ({ ...prev, [word]: true }));
      setErrorWords((prev) => ({ ...prev, [word]: false }));
      setToast(randomCheer);
    } else {
      setCheckedWords((prev) => ({ ...prev, [word]: false }));
      setErrorWords((prev) => ({ ...prev, [word]: true }));
    }
  };

  return (
    <Card title="🧠 Шинэ үг шалгах" style={{ maxWidth: 480, margin: "0 auto" }}>
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {words.length === 0 ? (
        <Text type="secondary">Хадгалагдсан үг алга байна.</Text>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Text>Шинэ үгнүүдээс хэд хэд сонгоно уу:</Text>

          <Select
            mode="multiple"
            placeholder="Үгнүүдийг сонгоно уу"
            value={selectedWords}
            onChange={(vals) => {
              setSelectedWords(vals);
              const newAnswers = {};
              vals.forEach((w) => {
                newAnswers[w] = answers[w] || "";
              });
              setAnswers(newAnswers);
              setCheckedWords({});
              setErrorWords({});
            }}
            style={{ width: "100%" }}
          >
            {words.map((w) => (
              <Option key={w} value={w}>
                {w}
              </Option>
            ))}
          </Select>

          {selectedWords.map((word) => (
            <div
              key={word}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                border: "1px solid #f0f0f0",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text strong>{word}</Text>

              <Input
                placeholder="Хариулт бичнэ үү"
                value={answers[word] || ""}
                onChange={(e) => handleInputChange(word, e.target.value)}
              />

              {errorWords[word] && (
                <Text style={{ color: "orange", fontSize: 12 }}>
                  Та дахин оролдно уу 😚
                </Text>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Button
                  type="primary"
                  onClick={() => handleCheck(word)}
                  style={{ flex: 1 }}
                >
                  Шалгах
                </Button>

                {checkedWords[word] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    style={{ width: 40, height: 40 }}
                  >
                    <GradientHeart />
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
