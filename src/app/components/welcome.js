"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Welcome({ name, profileUrl, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50 transition-opacity duration-500 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-white to-gray-100 p-8 rounded-3xl flex flex-col items-center shadow-2xl border border-gray-200 animate-fadeIn max-w-xs">
        <Image
          src={profileUrl}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full mb-4 ring-2 ring-indigo-300"
        />
        <p className="text-xl font-bold text-gray-800 text-center">
          Тавтай морил, {name}!
        </p>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
