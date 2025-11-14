"use client";

import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import LoadingDots from "./components/LoadingDots";
import type { Message } from "./types/chat";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Halo, saya GenHealth Chatbot 👋\n\nKamu bisa tanya tentang:\n• Hak dan kewajiban peserta JKN\n• Alur pendaftaran, rujukan, dan klaim\n• Istilah medis sederhana\n• Cara menggunakan Mobile JKN\n\nTulis pertanyaanmu, nanti aku jawab dengan bahasa yang mudah dipahami.",
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // TODO: ganti bagian ini dengan call ke backend RAG / LangChain kamu
      // Contoh dummy di sini: bot cuma nge-echo + sedikit jawaban template
      await new Promise((res) => setTimeout(res, 700));

      const assistantMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "Ini jawaban sementara dari dummy bot ya Boy 😄.\n\nNanti bagian ini kita sambungkan ke backend GenHealth (LLM + RAG) supaya:\n• Bot baca dokumen JKN & FAQ\n• Jawaban lebih akurat dan kontekstual\n\nPertanyaanmu barusan:\n" +
          text,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Maaf, terjadi kesalahan saat memproses pertanyaanmu. Coba lagi sebentar lagi ya 🙏",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold text-emerald-400">
              GenHealth Literacy Chatbot
            </h1>
            <p className="text-xs text-slate-400">
              Bantu pahami JKN & literasi kesehatan dengan bahasa sederhana.
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
            Beta • for research
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 gap-4 px-4 py-4">
        {/* Kolom chat */}
        <section className="flex flex-1 flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl">
          {/* Area pesan */}
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}

            {isLoading && (
              <div className="mt-2 flex justify-start">
                <div className="max-w-[60%] rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2">
                  <LoadingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="mt-3 border-t border-slate-800 pt-3">
            <ChatInput onSend={handleSend} disabled={isLoading} />
            <p className="mt-2 text-[10px] text-slate-500">
              ⚠️ GenHealth masih tahap pengembangan. Informasi yang diberikan
              bukan pengganti saran dokter atau petugas resmi BPJS Kesehatan.
            </p>
          </div>
        </section>

        {/* Sidebar info */}
        <aside className="hidden w-64 flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-200 lg:flex">
          <h2 className="text-sm font-semibold text-slate-50">
            Contoh pertanyaan
          </h2>
          <ul className="mt-2 space-y-2">
            <li className="rounded-xl bg-slate-800/70 px-3 py-2">
              • Apa saja hak peserta JKN kelas 3?
            </li>
            <li className="rounded-xl bg-slate-800/70 px-3 py-2">
              • Cara pindah faskes tingkat pertama gimana?
            </li>
            <li className="rounded-xl bg-slate-800/70 px-3 py-2">
              • Bedanya rujukan berjenjang dan IGD apa?
            </li>
            <li className="rounded-xl bg-slate-800/70 px-3 py-2">
              • Gimana cara cek status kepesertaan di Mobile JKN?
            </li>
          </ul>

          <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-emerald-100">
            <p className="font-semibold text-emerald-300">
              Catatan untuk penelitian
            </p>
            <p className="mt-1">
              UI ini bisa kamu gunakan untuk uji coba literasi kesehatan di
              masyarakat: tingkat pemahaman, jenis pertanyaan, dan pola
              interaksi pengguna.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
