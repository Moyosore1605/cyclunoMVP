import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";

export default function EmailVerify() {
const location = useLocation();
const navigate = useNavigate();
const [status, setStatus] = useState("pending"); // pending | success | error
const [message, setMessage] = useState("Verifying your email...");

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const uid = params.get("uid");
    const statusParam = params.get("status") || params.get("verified");

    if (statusParam === "success" || statusParam === "true") {
            setStatus("success");
            setMessage("Email verified successfully. Redirecting to dashboard...");
            return;
        }

        if (!token && !uid) {
            setStatus("error");
            setMessage("No verification token or uid found in the URL.");
            return;
        }

        (async () => {
            try {
                // call verifyEmail with uid+token object so backend gets both params
                if (uid && token) {
                    await verifyEmail({ uid, token });
                } else {
                    await verifyEmail(token || uid);
                }
                setStatus("success");
                setMessage("Email verified successfully. Redirecting to dashboard...");
            } catch (err) {
                const errMsg =
                    err?.response?.data?.message ||
                    err?.response?.data ||
                    err?.message ||
                    "Verification failed.";
                setStatus("error");
                setMessage(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
                console.error("email verify error:", err);
            }
        })();
    }, [location.search]);

    useEffect(() => {
        if (status === "success") {
            const t = setTimeout(() => navigate("/dashboard"), 2000);
            return () => clearTimeout(t);
        }
    }, [status, navigate]);

return (
    <main className="h-full flex items-center justify-center p-10">
        <div className="text-center">
        {status === "pending" && <p>{message}</p>}
        {status === "success" && <p style={{ color: "green" }}>{message}</p>}
        {status === "error" && <p style={{ color: "red" }}>{message}</p>}
        {status === "success" && <p style={{ fontSize: 13, marginTop: 8 }}>You will be redirected shortly.</p>}
        </div>
    </main>
);
}