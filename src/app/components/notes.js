"use client";

import { Card, Input, Button, List, Typography, Modal, Space } from "antd";
import { useEffect, useState } from "react";

const { TextArea } = Input;
const { Text } = Typography;

export default function Notes({ wordExplanations, setWordExplanations }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [modalWord, setModalWord] = useState(); // аль үг дээр modal нээхийг заана
  const [modalValue, setModalValue] = useState("");

  // Notes-ийг localStorage-с ачаалах
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);
  }, []);

  // Notes-ийг хадгалах
  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const updated = [...notes, { id: Date.now(), text: newNote }];
    saveNotes(updated);
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
  };

  // Modal хадгалах
  const handleSaveExplanation = () => {
    if (!modalWord) return;
    const updatedExplanations = {
      ...wordExplanations,
      [modalWord]: modalValue,
    };
    setWordExplanations(updatedExplanations);
    localStorage.setItem(
      "wordExplanations",
      JSON.stringify(updatedExplanations)
    );
    // message.success(`"${modalWord}" үгийн тайлбар хадгалагдлаа!`);
    setModalWord(null);
  };

  // Үг дээр дарахад Modal нээх
  const handleOpenModal = (word) => {
    setModalWord(word);
    setModalValue(wordExplanations[word] || "");
  };

  const getWordWithModal = (word, index) => {
    return (
      <Text
        key={index}
        style={{
          cursor: "pointer",
          backgroundColor: wordExplanations[word] ? "#fff7e6" : "inherit",
          padding: "0 2px",
          borderRadius: 4,
        }}
        onClick={() => handleOpenModal(word)} // ✅ ганц click → modal нээгдэнэ
      >
        {word}
      </Text>
    );
  };

  return (
    <div style={{ maxWidth: 700, margin: "0px auto" }}>
      <Card title="📝 Миний тэмдэглэлүүд">
        <Space.Compact style={{ width: "100%", marginBottom: 10 }}>
          <TextArea
            placeholder="Шинэ тэмдэглэлээ бичнэ үү..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            autoSize={{ minRows: 6, maxRows: 10 }}
          />
        </Space.Compact>
        <Button type="primary" onClick={handleAddNote} block>
          Нэмэх
        </Button>

        <List
          style={{ marginTop: 20 }}
          bordered
          dataSource={notes}
          renderItem={(note) => (
            <List.Item
              key={note.id}
              actions={[
                <Button
                  type="link"
                  danger
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Устгах
                </Button>,
              ]}
            >
              <div style={{ wordBreak: "break-word" }}>
                {note.text
                  .split(/\s+/)
                  .map((word, i) => getWordWithModal(word, i))}
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Modal хэсэг */}
      <Modal
        title={modalWord ? `${modalWord} үгийн тайлбар` : ""}
        open={!!modalWord}
        onOk={handleSaveExplanation}
        onCancel={() => setModalWord(null)}
        okText="Хадгалах"
        cancelText="Болих"
      >
        <TextArea
          rows={4}
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          placeholder="Тайлбар оруулна уу..."
        />
      </Modal>
    </div>
  );
}
