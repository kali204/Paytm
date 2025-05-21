import { useState } from "react";
import QrReader from "react-qr-scanner";

import { useNavigate } from "react-router-dom";

const QRCodeScanner = () => {
    const [scanResult, setScanResult] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
            try {
                // Assuming the QR code contains a JSON string with recipient details
                const recipient = JSON.parse(data);
                navigate(`/send-money?phone=${recipient.phone}&name=${recipient.name}`);
            } catch (err) {
                setError("Invalid QR code. Please try again.");
            }
        }
    };

    const handleError = (err) => {
        console.error("QR Scan Error:", err);
        setError("Failed to scan QR code. Please try again.");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Scan QR Code</h2>
                <div className="mb-4">
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%" }}
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {scanResult && (
                    <div className="mt-4 text-center">
                        <p className="text-green-600">Scanned Successfully!</p>
                        <p className="text-gray-700">{scanResult}</p>
                    </div>
                )}
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="w-full mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                    Close Scanner
                </button>
            </div>
        </div>
    );
};

export default QRCodeScanner;