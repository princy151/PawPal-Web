import React, { useState } from "react";

const Messages: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">Messages</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Chat with Pet Sitters</h2>
          
          <div className="overflow-y-auto max-h-72 mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <strong>{msg.sender}:</strong>
                <p className="text-gray-600">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="p-2 w-full border rounded-md mr-2"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
