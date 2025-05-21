import { useEffect, useState } from "react";
import axios from "axios";

const TransactionsPreview = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/account/transactions", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log("✅ Fetched Transactions:", response.data);

                if (!response.data || response.data.length === 0) {
                    setError("No transactions found.");
                } else {
                    // Limit the number of transactions to 5 for the preview
                    setTransactions(response.data.slice(0, 5));
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
        <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : transactions.length === 0 ? (
                <p className="text-center text-gray-500">No transactions to display.</p>
            ) : (
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
                                <td className="p-2 border">₹{Number(t.amount) ? Number(t.amount).toFixed(2) : "N/A"}</td>
                                <td className={`p-2 border ${t.status === "completed" ? "text-green-500" : "text-red-500"}`}>
                                    {t.status}
                                </td>
                                <td className="p-2 border">
                                    {t.timestamp ? new Date(t.timestamp).toLocaleDateString() : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="mt-4 text-center">
                <a
                    href="/transactions"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                    View All Transactions →
                </a>
            </div>
        </div>
    );
};

export default TransactionsPreview;