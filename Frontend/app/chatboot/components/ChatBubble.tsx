import type { Message } from "../types/chat";

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar bulat */}
      {!isUser && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white">
          AI
        </div>
      )}

      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-md
          ${
            isUser
              ? "bg-emerald-500 text-white rounded-br-sm"
              : "bg-slate-800 text-slate-50 rounded-bl-sm border border-slate-700"
          }
        `}
      >
        <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
        <span className="mt-1 block text-[10px] text-slate-400">
          {message.createdAt.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
          U
        </div>
      )}
    </div>
  );
}
