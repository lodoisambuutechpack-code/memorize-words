"use client";

import { Card, List, Typography, Button, Input, Space, message } from "antd";
import { useState } from "react";

const { Text } = Typography;

export default function SavedWordList({
  wordExplanations,
  setWordExplanations,
}) {
  const [newWord, setNewWord] = useState("");
  const [newExplanation, setNewExplanation] = useState("");

  // Үг устгах function
  const deleteWord = (word) => {
    const updated = { ...wordExplanations };
    delete updated[word];
    setWordExplanations(updated);
    localStorage.setItem("wordExplanations", JSON.stringify(updated));
    // message.success(`"${word}" устгагдлаа`);
  };

  // Шинэ үг нэмэх function
  const addWord = () => {
    const wordTrim = newWord.trim();
    const explTrim = newExplanation.trim();

    if (!wordTrim || !explTrim) {
      message.error("Үг болон тайлбарыг хоосон орхиж болохгүй");
      return;
    }

    if (wordExplanations[wordTrim]) {
      message.error(`"${wordTrim}" үг аль хэдийн хадгалагдсан байна`);
      return;
    }

    // ✅ Жинхэнэ үгийг key болгон хадгалах
    const updated = { ...wordExplanations, [wordTrim]: explTrim };
    setWordExplanations(updated);
    localStorage.setItem("wordExplanations", JSON.stringify(updated));

    setNewWord("");
    setNewExplanation("");
    message.success(`"${wordTrim}" нэмэгдлээ`);
  };

  const words = Object.keys(wordExplanations).sort(); // Үгийг alfabet-аар жагсаах боломжтой

  return (
    <Card title="💾 Хадгалагдсан үгний тайлбарууд">
      <Space style={{ marginBottom: 16 }} direction="horizontal" size="small">
        <Input
          placeholder="Шинэ үг"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          onPressEnter={addWord}
        />
        <Input
          placeholder="Тайлбар"
          value={newExplanation}
          onChange={(e) => setNewExplanation(e.target.value)}
          onPressEnter={addWord}
        />
        <Button type="primary" onClick={addWord}>
          Нэмэх
        </Button>
      </Space>

      {words.length === 0 ? (
        <Text type="secondary">Хадгалагдсан үг алга байна.</Text>
      ) : (
        <List
          size="small"
          bordered
          dataSource={words}
          renderItem={(word) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  danger
                  onClick={() => deleteWord(word)}
                  key="delete"
                >
                  Устгах
                </Button>,
              ]}
            >
              <strong>{word}:</strong> {wordExplanations[word]}
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}
