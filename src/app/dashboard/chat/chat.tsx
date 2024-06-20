"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import BackButton from "@/components/backButton";

const socket = io("http://localhost:3001"); // Cambia esta URL si tu backend está en otra dirección

const Chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.first_name + " " + user.last_name);
    } else {
      router.push("/auth/login");
    }

    socket.on("message", (message: { sender: string; content: string }) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.emit("join", username);

    return () => {
      socket.off("message");
    };
  }, [router, username]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { sender: username, content: newMessage };
      socket.emit("message", message);
      setNewMessage("");
    }
  };

  return (
    <main>
      <Header />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="container mt-5">
            <BackButton></BackButton>
            <h1>Chat en Vivo</h1>
            <div className="card">
              <div className="card-body">
                <div
                  className="chat-messages"
                  style={{ height: "300px", overflowY: "scroll" }}>
                  {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                      <strong>{message.sender}: </strong>
                      {message.content}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleSendMessage}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;
