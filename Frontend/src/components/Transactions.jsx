import { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/account/transactions", { // ✅ Direct URL
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log("✅ Fetched Transactions:", response.data);

                if (!response.data || response.data.length === 0) {
                    setError("No transactions found.");
                } else {
                    setTransactions(response.data); // ✅ Ensure correct data structure
                }
            } catch (err) {
                console.error("❌ Error fetching transactions:", err.response?.data || err.message);
                setError(err.response?.data?.error || "Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-4">Transaction History</h2>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Sender</th>
                                <th className="p-2 border">Receiver</th>
                                <th className="p-2 border">Amount (Rs)</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} className="text-center">
                                    <td className="p-2 border">{t.sender_email || "N/A"}</td>
                                    <td className="p-2 border">{t.receiver_email || "N/A"}</td>
                                    <td className="p-2 border">₹{Number(t.amount)? Number(t.amount).toFixed(2):"N/A"}</td>
                                    <td className={`p-2 border ${t.status === "success" ? "text-green-500" : "text-red-500"}`}>
                                        {t.status}
                                    </td>
                                    <td className="p-2 border">
                                        {t.timestamp ? new Date(t.timestamp).toLocaleString() : "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Transactions;
