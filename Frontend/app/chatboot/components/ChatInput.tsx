"use client";

import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSend: (value: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 shadow-lg"
    >
      <textarea
        rows={1}
        className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent text-sm text-slate-50 outline-none placeholder:text-slate-500"
        placeholder="Tanyakan apa saja tentang JKN, hak peserta, atau info kesehatan dasar..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex h-9 items-center justify-center rounded-xl bg-emerald-500 px-4 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Kirim
      </button>
    </form>
  );
}
