import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const receiverEmail = searchParams.get("email"); // ✅ Fix: Ensure `email` is retrieved correctly
    const receiverName = searchParams.get("name");   // ✅ Get Receiver Name
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Debugging: Check if `receiverEmail` is correctly retrieved
    useEffect(() => {
        console.log("🔍 Receiver Email:", receiverEmail);
    }, [receiverEmail]);

    const initiateTransfer = async () => {
        setMessage(""); // Clear previous messages

        // 🔥 Validate Fields
        if (!receiverEmail) {
            setMessage("❌ Receiver email is missing.");
            console.error("⚠️ Receiver email is missing in URL.");
            return;
        }
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage("❌ Please enter a valid amount greater than zero.");
            return;
        }

        setLoading(true);

        try {
            console.log("🔍 Sending request:", {
                receiver_email: receiverEmail,
                amount: parseFloat(amount),
            });

            const response = await axios.post(
                "http://127.0.0.1:5000/account/send_money",
                {
                    receiver_email: receiverEmail, // ✅ Ensure email is correctly passed
                    amount: parseFloat(amount),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure Token is Sent
                    },
                }
            );

            console.log("✅ Transfer Response:", response.data);

            if (response.data?.message?.toLowerCase().includes("successful")) {
                setMessage("✅ Transaction successful!");
            } else {
                setMessage(response.data?.message || "⚠️ Transaction failed.");
            }
        } catch (error) {
            console.error("❌ Transfer error:", error.response?.data || error.message);
            setMessage(error.response?.data?.error || "❌ Transaction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{receiverName ? receiverName[0].toUpperCase() : "?"}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{receiverName || "Unknown User"}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    value={amount}
                                    min="1"
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={initiateTransfer}
                                disabled={loading}
                                className={`justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full ${
                                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                            >
                                {loading ? "Processing..." : "Send Money"}
                            </button>
                            {message && (
                                <div
                                    className={`text-center text-sm mt-2 ${
                                        message.includes("successful") ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;
