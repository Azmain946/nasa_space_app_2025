import { useEffect, useState } from "react";
import axios from "axios";

const ChatWidget = ({publicationId}) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [pendingMessage, setPendingMessage] = useState(null);
  const [open, setOpen] = useState(false)

  // 🔹 API call whenever user sends a message
  useEffect(() => {
    if (!pendingMessage) return;

    const fetchBotReply = async () => {
      try {
        const response = await axios.post("https://www.syfuddhin.com/api/qa/single-doc",
          {
            publication_id: publicationId,
            question: pendingMessage,
            k: 6,
          },
          {
            headers: {
              "Content-Type": "application/json",
            }})

        const data = await response.data

        console.log("data: ", data);
        // Assuming API returns something like { answer: "..." }
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data?.answer || "Sorry, I didn’t get that." },
        ]);
      } catch (error) {
        console.error("API error:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Something went wrong. Please try again." },
        ]);
      } finally {
        setPendingMessage(null);
      }
    };

    fetchBotReply();
  }, [pendingMessage]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Trigger API request
    setPendingMessage(input);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 h-96 bg-blue-950 border border-white/10 rounded-2xl flex flex-col shadow-lg">
          {/* Header */}
          <div className="p-3 bg-blue-800 rounded-t-2xl flex justify-between items-center">
            <span className="text-white text-sm font-semibold">
              Ask Anything
            </span>
            <button onClick={() => setOpen(false)} className="text-white/70">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.sender === "user"
                      ? "bg-gray-700 text-white rounded-br-none"
                      : "bg-blue-600 text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-white text-sm placeholder-white/50 focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 rounded-full text-white text-sm"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
