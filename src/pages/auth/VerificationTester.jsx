import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { verifyEmail } from "../../api/auth";
import Spinner from "../../components/Spinner";

export default function VerificationTester() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const extractParams = (value) => {
        const raw = (value || "").trim();
        if (!raw) return null;

        try {
            const url = new URL(raw);
            const uid = url.searchParams.get("uid");
            const token = url.searchParams.get("token");
            console.log('log 1',uid,token);
            
            if (uid && token) return { uid, token, original: raw };
        } catch (e) {
            // not a valid URL, fall through
        }

        // fallback: if the user pasted only token
        return { token: raw };
    };

    const handleVerify = async () => {
        const params = extractParams(input);
        console.log('log1.5',params);
        
        if (!params) {
            toast.error("Please paste the full verify URL (uid & token) or the token.");
            return;
        }

        setLoading(true);
        try {
            
            const res = await verifyEmail({ uid: params.uid, token: params.token });
            console.log("verify response:", res);
            toast.success("Email verified successfully");
            // await verifyEmail(params.original || params.token || params);
            console.log('log3', params.uid, params.original,params.token);
            toast.success("Email verified successfully");
            setTimeout(() => navigate("/emailverify?status=success"), 800);
        } catch (err) {
            const errMsg =
                err?.response?.data?.message ||
                err?.response?.data ||
                err?.message ||
                "Verification failed";
            toast.error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
            console.error("verify error:", err);
        } finally {
            setLoading(false);
        }
    };
if (loading) {
    <Spinner/>;
}

return (
    <main className="h-screen flex flex-col items-center justify-center p-10">
        <h2 className="font-fraunces text-3xl">Developer: Email Verification Tester</h2>
        <p className="mb-2 mt-10">Paste the full verify URL or token here.</p>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
        placeholder="Paste full verify_url or token"
        className="border border-gray-400 p-3 w-full rounded-lg"/>
        <div className="mt-5">
            <button onClick={handleVerify} disabled={loading || !input} className="p-3 bg-[#1B365D] text-white rounded-lg">
                {loading ? "Verifying..." : "Verify"}
            </button>
        </div>
    </main>
);
}