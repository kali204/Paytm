import { useState } from "react";

const RequestMoney = () => {
    const [form, setForm] = useState({
        fromEmail: "",
        amount: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/request-money", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Money request sent successfully!");
                setForm({ fromEmail: "", amount: "", message: "" });
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert("Something went wrong while sending the request.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4">Request Money</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">From (Email)</label>
                    <input
                        type="email"
                        name="fromEmail"
                        value={form.fromEmail}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Message (optional)</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        rows="3"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Request Money
                </button>
            </form>
        </div>
    );
};

export default RequestMoney;
