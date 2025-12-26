import React, { useState, useEffect, useRef } from "react";
import { sendOtpMSG91, verifyOtpMSG91 } from "../services/messageService";
import { checkUserExists, getUserByPhone } from "../services/userService";
import { signInWithHiddenAuth } from "../services/authService";

interface Props {
    onAuthSuccess: () => void;
    onSwitchToSignup: () => void;
    onClose: () => void;
}

const Spinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0..." />
    </svg>
);

const AuthGateModal: React.FC<Props> = ({
    onAuthSuccess,
    onSwitchToSignup,
    onClose
}) => {

    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [countdown, setCountdown] = useState(0);
    const ref = useRef<any>(null);

    // Countdown
    useEffect(() => {
        if (countdown > 0) {
            ref.current = setInterval(() => setCountdown(x => x - 1), 1000);
        }
        return () => clearInterval(ref.current);
    }, [countdown]);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const fullPhone = "+91" + phoneNumber;
        const plainPhone = phoneNumber;          // for Firestore


        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Enter a valid 10-digit number.");
            return;
        }

        setIsLoading(true);

        try {
            // Check Firestore first
            const exists = await checkUserExists(plainPhone);

            if (!exists) {
                setError("Phone not registered. Please sign up first.");
                setIsLoading(false);
                return;
            }

            // Send OTP through MSG91
            await sendOtpMSG91(fullPhone);

            setStep("otp");
            setCountdown(60);

        } catch (err) {
            setError("Unable to send OTP. Try again.");
        }

        setIsLoading(false);
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const fullPhone = "+91" + phoneNumber;

        try {
            const result = await verifyOtpMSG91(fullPhone, otp);

            if (result.type === "success") {
                // Fetch user data and store email in localStorage
                const user = await getUserByPhone(phoneNumber);
                if (user && (user as any).email) {
                    const userEmail = (user as any).email;
                    localStorage.setItem('USAUserEmail', userEmail);

                    // 🔐 SIGN IN WITH HIDDEN AUTH (Passwordless Backend-Managed Auth)
                    // After OTP verification, automatically sign in the user with Firebase Auth
                    // using the hidden password - user never sees or types it
                    // If user needs migration, it will be attempted automatically
                    try {
                        const firebaseUser = await signInWithHiddenAuth(userEmail);
                        if (firebaseUser) {
                            // console.log("✅ User signed in with hidden auth:", firebaseUser.uid);
                        } else {
                            console.warn("❌ Failed to sign in with hidden auth");
                            setError("Login failed. Please try again or contact support if the issue persists.");
                            setIsLoading(false);
                            return;
                        }
                    } catch (authError) {
                        console.error("Error signing in with hidden auth:", authError);
                        setError("Login failed. Please try again or contact support if the issue persists.");
                        setIsLoading(false);
                        return;
                    }

                    // Dispatch auth success event (for Header and useAppState to listen)
                    window.dispatchEvent(new CustomEvent('auth-success', {
                        detail: { userEmail }
                    }));
                }
                onAuthSuccess();
            } else {
                setError("Invalid OTP.");
            }

        } catch (err) {
            setError("OTP verification failed.");
        }

        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">

            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl w-full max-w-md relative shadow-2xl animate-fadeIn">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                    ✕
                </button>

                {/* Header with Logo */}
                <div className="text-center mb-6">
                    <img
                        src="https://ai.eecglobal.com/assets/logos/eeclogo-main.png"
                        alt="EEC"
                        className="mx-auto h-10 mb-4"
                    />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Welcome back!
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Enter your phone number to continue
                    </p>
                </div>

                {/* PHONE INPUT */}
                {step === "phone" && (
                    <form onSubmit={handleSendOtp} className="space-y-6">

                        <div className="relative">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">+91</span>

                                <input
                                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg pl-14 pr-4 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                                    }
                                    placeholder="875 888 0034"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || phoneNumber.length !== 10}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <Spinner />
                                    <span className="ml-2">Sending...</span>
                                </span>
                            ) : (
                                "Send OTP"
                            )}
                        </button>

                    </form>
                )}

                {/* OTP INPUT */}
                {step === "otp" && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Enter OTP
                            </label>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 text-center">
                                We sent a 6-digit code to <strong className="text-slate-700 dark:text-slate-300">+91 {phoneNumber}</strong>
                            </p>
                            <input
                                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg text-center tracking-[1em] py-3 px-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-shadow text-lg font-semibold"
                                placeholder="______"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                }
                                maxLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={otp.length !== 6 || isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <Spinner />
                                    <span className="ml-2">Verifying...</span>
                                </span>
                            ) : (
                                "Verify & Continue"
                            )}
                        </button>

                        <div className="text-center space-y-2">
                            <button
                                type="button"
                                disabled={countdown > 0}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors text-sm font-medium"
                                onClick={() => {
                                    setOtp("");
                                    setStep("phone");
                                    setCountdown(0);
                                }}
                            >
                                Change number {countdown > 0 && `(${countdown}s)`}
                            </button>
                            {countdown > 0 && (
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Resend OTP in {countdown}s
                                </p>
                            )}
                        </div>

                    </form>
                )}

                {/* Error message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-center text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Don't have an account?{" "}
                        <button
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 ml-1 font-semibold transition-colors"
                            onClick={onSwitchToSignup}
                        >
                            Sign up
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );

};

export default AuthGateModal;
