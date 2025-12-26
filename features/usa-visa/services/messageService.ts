const SEND_OTP_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/sendOtpUSA";
const VERIFY_OTP_URL = "https://us-central1-usa-visa-prep-c72f7.cloudfunctions.net/verifyOtpUSA";

export const sendOtpMSG91 = async (phone: string) => {
    try {
        const res = await fetch(SEND_OTP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || data?.error || "Failed to send OTP");
        }
        return data;
    } catch (err: any) {
        console.error("🔥 sendOtpMSG91 ERROR", err);
        throw err;
    }
};

export const verifyOtpMSG91 = async (phone: string, otp: string) => {
    try {
        const res = await fetch(VERIFY_OTP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, otp }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || data?.error || "Failed to verify OTP");
        }
        return data;
    } catch (err: any) {
        console.error("🔥 verifyOtpMSG91 ERROR", err);
        throw err;
    }
};
