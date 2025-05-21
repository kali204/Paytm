import { useState } from "react";
import axios from "axios";
import QRCodeScanner from "../components/QRCodeScanner"; // Assume this component exists

const SendMoney = () => {
    const [recipientPhone, setRecipientPhone] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);

    const handleQRScan = (data) => {
        if (data) {
            // Assuming the QR code contains a JSON string with recipient details
            try {
                const recipient = JSON.parse(data);
                setRecipientPhone(recipient.phone);
                setRecipientName(recipient.name);
                setShowQRScanner(false); // Close the QR scanner after successful scan
            } catch (error) {
                setMessage("❌ Invalid QR code. Please try again.");
            }
        }
    };

    const initiateTransfer = async () => {
        setMessage(""); // Clear previous messages

        // Validate Fields
        if (!recipientPhone) {
            setMessage("❌ Recipient phone number is required.");
            return;
        }
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage("❌ Please enter a valid amount greater than zero.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/account/send_money",
                {
                    recipient_phone: recipientPhone,
                    amount: parseFloat(amount),
                    note: note,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("✅ Transfer Response:", response.data);

            if (response.data?.message?.toLowerCase().includes("successful")) {
                setMessage("✅ Transaction successful!");
                setAmount(""); // Clear the amount field after successful transfer
                setNote(""); // Clear the note field
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
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Money</h2>
                    <p className="text-gray-600">Transfer funds securely to your recipient.</p>
                </div>

                <div className="mt-8">
                    {/* Recipient Phone Input */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                            Recipient Phone Number
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                onChange={(e) => setRecipientPhone(e.target.value)}
                                type="tel"
                                value={recipientPhone}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                id="phone"
                                placeholder="Enter phone number"
                                disabled={loading}
                            />
                            <button
                                onClick={() => setShowQRScanner(true)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-all"
                            >
                                Scan QR
                            </button>
                        </div>
                    </div>

                    {/* Recipient Name (if available) */}
                    {recipientName && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                Recipient Name
                            </label>
                            <input
                                type="text"
                                value={recipientName}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                id="name"
                                disabled
                            />
                        </div>
                    )}

                    {/* Amount Input */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            value={amount}
                            min="1"
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            id="amount"
                            placeholder="0.00"
                            disabled={loading}
                        />
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {[100, 200, 500].map((quickAmount) => (
                            <button
                                key={quickAmount}
                                onClick={() => setAmount(quickAmount.toString())}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-all"
                            >
                                ₹{quickAmount}
                            </button>
                        ))}
                    </div>

                    {/* Transaction Note */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="note">
                            Add a note (optional)
                        </label>
                        <input
                            onChange={(e) => setNote(e.target.value)}
                            type="text"
                            value={note}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            id="note"
                            placeholder="e.g., For dinner"
                            disabled={loading}
                        />
                    </div>

                    {/* Send Money Button */}
                    <button
                        onClick={initiateTransfer}
                        disabled={loading}
                        className={`w-full mt-6 px-4 py-3 rounded-lg text-white font-semibold transition-all ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 active:bg-green-700"
                        }`}
                    >
                        {loading ? "Processing..." : "Send Money"}
                    </button>

                    {/* Feedback Message */}
                    {message && (
                        <div
                            className={`mt-4 text-center text-sm font-medium ${
                                message.includes("successful") ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Security Message */}
                    <div className="mt-4 text-center text-xs text-gray-500">
                        🔒 Your transaction is secure and encrypted.
                    </div>
                </div>
            </div>

            {/* QR Code Scanner Modal */}
            {showQRScanner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Scan QR Code</h3>
                        <QRCodeScanner onScan={handleQRScan} />
                        <button
                            onClick={() => setShowQRScanner(false)}
                            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendMoney;