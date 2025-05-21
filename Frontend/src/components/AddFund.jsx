import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFunds = () => {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit_card");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddFunds = async () => {
        setMessage(""); // Clear previous messages

        // Validate Fields
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage("❌ Please enter a valid amount greater than zero.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/account/add_funds",
                {
                    amount: parseFloat(amount),
                    payment_method: paymentMethod,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("✅ Add Funds Response:", response.data);

            if (response.data?.message?.toLowerCase().includes("successful")) {
                setMessage("✅ Funds added successfully!");
                setAmount(""); // Clear the amount field after successful transaction
            } else {
                setMessage(response.data?.message || "⚠️ Failed to add funds.");
            }
        } catch (error) {
            console.error("❌ Add Funds Error:", error.response?.data || error.message);
            setMessage(error.response?.data?.error || "❌ Failed to add funds. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Add Funds</h2>
                    <p className="text-gray-600">Add money to your wallet securely.</p>
                </div>

                <div className="mt-8">
                    {/* Amount Input */}
                    <div className="mt-4">
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

                    {/* Payment Method Selection */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="paymentMethod">
                            Payment Method
                        </label>
                        <select
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            value={paymentMethod}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            id="paymentMethod"
                            disabled={loading}
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="net_banking">Net Banking</option>
                        </select>
                    </div>

                    {/* Add Funds Button */}
                    <button
                        onClick={handleAddFunds}
                        disabled={loading}
                        className={`w-full mt-6 px-4 py-3 rounded-lg text-white font-semibold transition-all ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 active:bg-green-700"
                        }`}
                    >
                        {loading ? "Processing..." : "Add Funds"}
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
        </div>
    );
};

export default AddFunds;