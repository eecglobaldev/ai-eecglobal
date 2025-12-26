import React, { useState, useEffect, useRef } from "react";
import { sendOtpMSG91, verifyOtpMSG91 } from "../services/messageService";
import { checkUserExists, getUserByPhone } from "../services/userService";
import { Phone, X, Loader2, ArrowRight, Shield, Sparkles, KeyRound, RefreshCcw, AlertCircle, UserPlus } from "lucide-react";

interface Props {
  onAuthSuccess: () => void;
  onSwitchToSignup: () => void;
  onClose: () => void;
}

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
        // Fetch user data and store email in localStorage (SSR guard)
        const user = await getUserByPhone(phoneNumber);
        if (user && (user as any).email && typeof window !== 'undefined') {
          localStorage.setItem('UkUserEmail', (user as any).email);
          
          // Dispatch auth success event (for Header and useAppState to listen)
          window.dispatchEvent(new CustomEvent('auth-success', {
            detail: { userEmail: (user as any).email }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-md animate-fade-in">
      
      <div className="relative bg-white dark:bg-[#161b22] p-8 rounded-3xl w-full max-w-md shadow-2xl border border-slate-200/50 dark:border-[#30363d] overflow-hidden">
        
        {/* Decorative gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
        
        {/* Background ambient glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
  
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
  
        {/* Header with Logo */}
        <div className="relative text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl mb-5 shadow-lg shadow-indigo-500/20">
            <img 
              src="https://ai.eecglobal.com/assets/logos/eeclogo-main.png" 
              alt="EEC" 
              className="h-10" 
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            Welcome back!
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {step === "phone" ? "Enter your phone number to continue" : "Verify your identity"}
          </p>
        </div>
  
        {/* PHONE INPUT */}
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <span className="text-lg">🇮🇳</span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">+91</span>
                </div>

                <input
                  className="w-full border-2 border-slate-200 dark:border-slate-600 rounded-xl pl-[90px] pr-4 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-500 text-lg font-medium"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="87587 53333"
                  required
                />
                
                {phoneNumber.length === 10 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length !== 10}
              className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isLoading ? (
                <span className="relative flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </span>
              ) : (
                <span className="relative flex items-center justify-center gap-2">
                  Send OTP
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </button>

          </form>
        )}
  
        {/* OTP INPUT */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Enter Verification Code
                </label>
              </div>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  We sent a 6-digit code to <strong className="text-slate-800 dark:text-white">+91 {phoneNumber}</strong>
                </p>
              </div>
              
              <input
                className="w-full border-2 border-slate-200 dark:border-slate-600 rounded-xl text-center tracking-[0.5em] py-4 px-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-500 text-2xl font-bold"
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isLoading ? (
                <span className="relative flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="relative flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verify & Continue
                </span>
              )}
            </button>

            <div className="text-center space-y-3">
              <button
                type="button"
                disabled={countdown > 0}
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors text-sm font-semibold"
                onClick={() => {
                  setOtp("");
                  setStep("phone");
                  setCountdown(0);
                }}
              >
                <RefreshCcw className="w-4 h-4" />
                Change number {countdown > 0 && `(${countdown}s)`}
              </button>
              {countdown > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-lg inline-block">
                  Resend OTP in <span className="font-bold text-indigo-600 dark:text-indigo-400">{countdown}s</span>
                </p>
              )}
            </div>

          </form>
        )}
  
        {/* Error message */}
        {error && (
          <div className="mt-5 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-3 animate-fade-in">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-sm text-rose-700 dark:text-rose-300 font-medium">
              {error}
            </p>
          </div>
        )}
  
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-700/50">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?
          </p>
          <button 
            className="mt-3 w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300" 
            onClick={onSwitchToSignup}
          >
            <UserPlus className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
  
};

export default AuthGateModal;
