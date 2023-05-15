import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const Chat = () => {
    const [chatHistory, setChatHistory] = useState([
        {
            role: "assistant",
            content: "Hi, how can I help you today?",
        },
    ]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentSystem, setCurrentSystem] = useState("");
    const [tokensUsed, setTokensUsed] = useState(0);
    const chatContainerRef = useRef(null);

    const addMessage = (role, message) => {
        setChatHistory([...chatHistory, { role, content: message }]);
    };

    const callApi = async () => {
        const newMessage = { role: "user", content: currentMessage };
        const newSystem = { role: "system", content: currentSystem };
        let fullChat = [...chatHistory, newMessage];
        if (currentSystem) {
            fullChat = [...fullChat, newSystem];
        }
        console.log(fullChat);
        try {
            console.log(chatHistory);
            const response = await axios.get("/api/gpt-answer", {
                params: {
                    question: currentMessage,
                    chat: JSON.stringify(fullChat),
                },
            });
            console.log(response.data);
            setTokensUsed(response.data.usage.total_tokens);
            const newAnswer = {
                role: "assistant",
                content: response.data.answer,
            };
            setChatHistory((prevChat) => [...prevChat, newAnswer]);
        } catch (error) {
            console.error("Error getting all items", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addMessage("user", currentMessage);
        console.log(chatHistory);
        setCurrentMessage("");
        // send currentMessage to API or perform other action here
        callApi();
    };

    useEffect(() => {
        // scroll to the bottom of the chat container when a new message is added
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [chatHistory]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div>Tokens used: {tokensUsed}</div>
            <input
                type="text"
                placeholder="Type your system here"
                value={currentSystem}
                onChange={(event) => setCurrentSystem(event.target.value)}
                className="border rounded-lg py-2 px-4 w-full"
            />
            <div ref={chatContainerRef} className="h-96 overflow-y-scroll">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={classNames("my-2", {
                            "text-right": chat.role === "user",
                            "text-left": chat.role === "assistant",
                        })}
                    >
                        <span
                            className={classNames(
                                "inline-block rounded-lg px-2 py-1 max-w-full break-word",
                                {
                                    "bg-gray-100": chat.role === "assistant",
                                    "bg-blue-500 text-white":
                                        chat.role === "user",
                                }
                            )}
                        >
                            {chat.content}
                        </span>
                    </div>
                ))}
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message here"
                    value={currentMessage}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    className="border rounded-lg py-2 px-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-2"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
