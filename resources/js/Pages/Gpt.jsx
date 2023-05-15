import Chat from "@/Components/Chat";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Gpt({ auth }) {
    // console.log(answer.choices[0].message.content);

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [answer, setAnswer] = useState("");

    const handleSubmit = async () => {
        const newMessage = { role: "user", content: message };
        const fullChat = [...chat, newMessage];
        try {
            setChat((prevChat) => [...prevChat, newMessage]);
            console.log(chat);
            const response = await axios.get("/api/gpt-answer", {
                params: {
                    question: message,
                    chat: JSON.stringify(fullChat),
                },
            });
            console.log(response.data);
            setAnswer(response.data);
            const newAnswer = { role: "assistant", content: answer };
            setChat((prevChat) => [...prevChat, newAnswer]);
        } catch (error) {
            console.error("Error getting all items", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Chat />
                        {/* <div className="flex flex-col w-full p-6 bg-white border-b border-gray-200">
                            {chat.map((item, index) => {
                                if (item.role === "user") {
                                    return (
                                        <div className="flex w-auto justify-items-start">
                                            <div key={index}>
                                                {item.content}
                                            </div>
                                        </div>
                                    );
                                } else if (item.role === "assistant") {
                                    return (
                                        <div className="flex w-auto justify-items-end">
                                            <div key={index}>
                                                {item.content}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div> */}
                        {/* <form action="" method="post"> */}
                        {/* <label htmlFor="answer">Answer</label>
                        <input
                            name="answer"
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <button type="submit" onClick={handleSubmit}>
                            Submit
                        </button> */}
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
