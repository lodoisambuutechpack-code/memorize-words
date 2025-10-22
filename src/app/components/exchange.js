"use client";

import { useState } from "react";
import { DatePicker, Button, Select, Typography, message } from "antd";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Exchange() {
  const [range, setRange] = useState([]); // [start, end]
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  // 🧮 Хоорондох бүх өдрүүдийг гаргах
  const getDatesBetween = (start, end) => {
    const dates = [];
    let current = start.clone();
    while (current.isBefore(end) || current.isSame(end, "day")) {
      dates.push(current.clone());
      current = current.add(1, "day");
    }
    return dates;
  };

  // 📦 Гол Fetch функц
  async function fetchDataForRange() {
    if (!range || range.length !== 2) {
      alert("Огнооны муж сонгоно уу!");
      return;
    }
    if (!currency) {
      alert("Валют сонгоно уу!");
      return;
    }

    const [start, end] = range;
    const allDates = getDatesBetween(start, end);
    setLoading(true);

    const allResults = [];

    for (const d of allDates) {
      const formattedDate = d.format("YYYYMMDD");
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://www.golomtbank.com/api/exchange?date=${formattedDate}`
      )}`;

      try {
        const res = await fetch(proxyUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const wrapper = await res.json();
        const bodyText = wrapper?.contents;
        if (!bodyText) throw new Error("Proxy returned empty contents");

        const apiData = JSON.parse(bodyText);
        const result = apiData?.result?.[currency];

        if (result) {
          allResults.push({
            date: d.format("YYYY-MM-DD"),
            currency: result.fixcurcode,
            name: result.fixcurname,
            mongolbank: result.mongolbank.cvalue,
            cash_buy: result.cash_buy.cvalue,
            cash_sell: result.cash_sell.cvalue,
            non_cash_buy: result.non_cash_buy.cvalue,
            non_cash_sell: result.non_cash_sell.cvalue,
          });
        }
      } catch (err) {
        console.error(err);
        message.error(`${d.format("YYYY-MM-DD")}-ны ханш татахад алдаа`);
      }
    }

    // Excel файл үүсгэх
    if (allResults.length > 0) {
      const ws = XLSX.utils.json_to_sheet(allResults);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `${currency}_rates`);
      XLSX.writeFile(
        wb,
        `GolomtBank_${currency}_${start.format("YYYYMMDD")}_${end.format(
          "YYYYMMDD"
        )}.xlsx`
      );
      alert(`Excel файл татагдлаа (${allResults.length} мөр)`);
    } else {
      alert("Өгөгдөл олдсонгүй");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 600,
        margin: "0 auto",
        background: "white",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        💱 Голомт банк — Валютын ханш (Excel татах)
      </Title>

      {/* 🪙 Валют сонголт */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Select
          value={currency}
          onChange={setCurrency}
          style={{ width: 160 }}
          placeholder="Валют сонгох"
        >
          <Option value="USD">USD — Америк доллар</Option>
          <Option value="EUR">EUR — Евро</Option>
          <Option value="CNY">CNY — Хятад юань</Option>
          <Option value="JPY">JPY — Япон иен</Option>
          <Option value="KRW">KRW — Солонгос вон</Option>
        </Select>
      </div>

      {/* 🗓 Огноо сонгох */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <RangePicker
          value={range}
          onChange={(values) => setRange(values || [])}
          format="YYYY-MM-DD"
          disabledDate={(d) => d && d.isAfter(dayjs())}
        />
      </div>

      {/* ⬇️ Татах товч */}
      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          onClick={fetchDataForRange}
          loading={loading}
          size="large"
        >
          Excel татах
        </Button>
      </div>
    </div>
  );
}
