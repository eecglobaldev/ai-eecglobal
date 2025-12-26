import React, { useState, useEffect, useRef } from 'react';
import { sendEmailOtp, verifyEmailOtp, sendRegistrationNotificationEmailsUniversal } from '../services/emailService';
import { STATES } from '../data/states';
import { CITIES } from '../data/cities';
import { TARGET_COUNTRIES } from '../data/targetCountries';
import { BRANCHES } from '../data/branches';
import { registerUser, checkEmailExists, checkUserExists, signInWithHiddenAuth } from "../services/userService";
import { sendOtpMSG91, verifyOtpMSG91 } from '../services/messageService';


interface LoginSignupModalProps {
  onAuthSuccess: () => void;
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const Spinner: React.FC<{className?: string}> = ({ className = "h-5 w-5 text-white" }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ onAuthSuccess, onSwitchToLogin, onClose }) => {

  // Email verification
  const [emailVerificationStep, setEmailVerificationStep] = useState<'idle' | 'pending' | 'verified'>('idle');

  // Phone verification
  const [phoneStep, setPhoneStep] = useState<'idle' | 'pending' | 'verified'>('idle');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneOtpError, setPhoneOtpError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    targetCountry: 'Australia', // Default to Austria
    visaType: '', // Study Visa, PR Visa, Work Visa
    educationLevel: '', // Diploma, Bachelor's, Master's
    parentAnnualIncome: '', // Income ranges
    isEECAgent: '', // Yes or No
    branch: '', // Selected branch identifier
  });

  const [otp, setOtp] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  // const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null); // Email-specific error
  const [phoneError, setPhoneError] = useState<string | null>(null); // Phone-specific error
  const [otpError, setOtpError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);



  // ----------------------------
  // PHONE: SEND OTP
  // ----------------------------
  const handleSendPhoneOtp = async () => {
    if (formData.phone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    const fullPhone = "+91" + formData.phone;
    const plainPhone = formData.phone; // for Firestore check
    setError(null);
    setPhoneError(null);
    setPhoneOtpError(null);
    setIsSendingPhoneOtp(true);

    try {
      // Check if phone number already exists in Firebase
      const phoneExists = await checkUserExists(plainPhone);
      if (phoneExists) {
        setPhoneError("An account with this phone number already exists. Please sign in instead.");
        setIsSendingPhoneOtp(false);
        return;
      }

      // If phone doesn't exist, send OTP
      const result = await sendOtpMSG91(fullPhone);

      if (result) {
        setPhoneStep("pending");
        setCountdown(60);
      } else {
        setPhoneError("Failed to send phone OTP. Try again.");
      }
    } catch (err) {
      setPhoneError("Unable to send phone OTP. Try again.");
    }

    setIsSendingPhoneOtp(false);
  };

  // ----------------------------
  // PHONE: VERIFY OTP
  // ----------------------------
  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      setPhoneOtpError("Enter the 6-digit OTP.");
      return;
    }

    setPhoneOtpError(null);
    setIsVerifyingPhoneOtp(true);

    const fullPhone = "+91" + formData.phone;

    try {
      const result = await verifyOtpMSG91(fullPhone, phoneOtp);

      if (result.type === "success" || result.message?.toLowerCase().includes("verified")) {
        setPhoneStep("verified");
      } else {
        setPhoneOtpError("Invalid OTP.");
        setPhoneOtp("");
      }
    } catch (err) {
      setPhoneOtpError("Failed to verify OTP. Try again.");
    }

    setIsVerifyingPhoneOtp(false);
  };



  // Countdown timer (shared for both)
  useEffect(() => {
    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
    } else if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [countdown]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }

    } else if (name === 'state') {
      setFormData(prev => ({ ...prev, state: value, city: '' }));
      setCities(CITIES[value] || []);

    } else if (name === 'isEECAgent') {
      // If user selects No, clear the branch selection
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        branch: value === 'No' ? '' : prev.branch
      }));

    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };



  // Email OTP
  const handleSendEmailOtp = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setEmailError(null);
    setOtpError(null);
    // setIsSendingOtp(true);
    try {
      // Check if email already exists in Firebase
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setEmailError("An account with this email already exists. Please sign in instead.");
        // setIsSendingOtp(false);
        return;
      }

      // If email doesn't exist, send OTP
      const success = await sendEmailOtp(formData.email, formData.targetCountry);
      if (success) {
        setEmailVerificationStep('pending');
        setCountdown(60);
      } else {
        setEmailError('Failed to send OTP. Please check your email and try again.');
      }
    } catch (err) {
      setEmailError('An unexpected error occurred.');
    } finally {
      // setIsSendingOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter the 6-digit OTP.');
      return;
    }
    setOtpError(null);
    setError(null);
    setIsVerifyingOtp(true);
    try {
      const success = await verifyEmailOtp(formData.email, otp);
      if (success) {
        setEmailVerificationStep('verified');
      } else {
        setOtpError('Invalid OTP. Please try again.');
        setOtp('');
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };



  // Register with Hidden Firebase Auth
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setError(null);
    setEmailError(null);

    try {

      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setEmailError("An account with this email already exists. Please sign in instead.");
        setIsRegistering(false);
        return;
      }

      // Ensure all required fields are included in the data being sent to Firebase
      const resolvedStateName = STATES.find(s => s.code === formData.state)?.name || formData.state;


      const userDataToSave = {
        ...formData,
        state: resolvedStateName,
        targetCountry: formData.targetCountry || 'Australia', // Default to Australia if not set
        isEECAgent: formData.isEECAgent || '', // EEC agent status
        branch: formData.isEECAgent === 'Yes' ? (formData.branch || '') : '', // Branch only if EEC agent is Yes
      };
      
      // 🔥 Register user with SERVER-SIDE Firebase Auth (Cloud Function handles encryption)
      const result = await registerUser(userDataToSave);

      if (result === "EXISTS") {
        setEmailError("An account with this email already exists. Please sign in instead.");
        onSwitchToLogin();
        return;
      }

      if (result === "ERROR") {
        setError("Something went wrong. Please try again.");
        return;
      }

      // ✅ User created successfully with SERVER-SIDE Firebase Auth
      // result === "OK" means success

      // 3️⃣ Sign in immediately using hidden Firebase Auth so session is active
      const firebaseUser = await signInWithHiddenAuth(formData.email);

      if (!firebaseUser) {
        setError("Registration succeeded, but we couldn't sign you in. Please try signing in from the login tab.");
        return;
      }

      // 4️⃣ Store user details locally for downstream flows
      localStorage.setItem('AUgsUserEmail', formData.email);
      localStorage.setItem('AUgsUserName', formData.name);

      // 5️⃣ Dispatch auth success event (for Header and useAppState to listen)
      window.dispatchEvent(new CustomEvent('auth-success', {
        detail: { userEmail: formData.email }
      }));

      // Fire email notifications to admins and branch counselors
      try {
        await sendRegistrationNotificationEmailsUniversal(userDataToSave);
      } catch (notifyError) {
        console.error('Failed to send registration notification emails', notifyError);
      }

      onAuthSuccess();

    } finally {
      setIsRegistering(false);
    }
  };



  const inputClass =
    "w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition bg-white dark:bg-slate-900 dark:text-slate-100";
  const labelClass =
    "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-5 relative max-h-[96vh] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-1 w-8 h-8 flex items-center justify-center transition-colors duration-200">
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-3">
          <img src="/assets/logos/eeclogo-main.png" alt="EEC" className="mx-auto h-10 mb-2" />
          <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
            Welcome!
          </h2>
          <p className="mt-1 text-base text-slate-600 dark:text-slate-400">
            Create an account or{" "}
            <button onClick={onSwitchToLogin} className="text-indigo-600 font-semibold">
              Sign In
            </button>
          </p>
        </div>



        {/* FORM */}
        <form onSubmit={handleRegister} className="mt-2 space-y-3">



          {/* FULL NAME */}
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" name="name" required value={formData.name}
              onChange={handleInputChange} className={inputClass} />
          </div>



          {/* EMAIL + VERIFY BUTTON */}
          <div>
            <label className={labelClass}>Email</label>
            <div className="flex items-center gap-2">

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => {
                  handleInputChange(e);
                  setEmailError(null); // Clear error when user types
                }}
                className={`${inputClass} ${emailError ? 'border-red-500' : ''}`}
                //disabled={emailVerificationStep !== "idle"}
              />

              {/* {emailVerificationStep === "idle" && (
                <button type="button"
                  onClick={handleSendEmailOtp}
                  disabled={isSendingOtp || !formData.email.includes("@")}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-lg">
                  {isSendingOtp ? <Spinner /> : "Verify"}
                </button>
              )}

              {emailVerificationStep === "verified" && (
                <span className="text-green-600 font-semibold">✔ Verified</span>
              )} */}

            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>



          {/* EMAIL OTP BOX */}
          {emailVerificationStep === "pending" && (
            <div className="mt-2 p-3 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-indigo-200 dark:border-slate-600 shadow-sm space-y-2">

              <p className="text-xs text-center text-slate-700 dark:text-slate-300">
                Enter the 6-digit code sent to<br/>
                <strong className="text-indigo-600 dark:text-indigo-400 text-xs">{formData.email}</strong>
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg text-center text-base tracking-[0.2em] font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 dark:focus:ring-indigo-600 focus:outline-none transition text-sm"
                  maxLength={6}
                />

                <button
                  type="button"
                  onClick={handleVerifyEmailOtp}
                  disabled={isVerifyingOtp}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {isVerifyingOtp ? <Spinner className="h-4 w-4" /> : "Confirm"}
                </button>
              </div>

              {otpError && (
                <p className="text-center text-xs text-red-600 dark:text-red-400 font-medium">{otpError}</p>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={countdown > 0}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium disabled:text-slate-400 disabled:cursor-not-allowed transition">
                  Resend OTP {countdown > 0 ? `(${countdown}s)` : ""}
                </button>
              </div>

            </div>
          )}



          {/* PHONE NUMBER + VERIFY BUTTON */}
          <div>
            <label className={labelClass}>
              Phone Number
              {/* {emailVerificationStep !== 'verified' && (
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                  [Please verify your email first]
                </span>
              )} */}
            </label>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-3 text-slate-500">+91</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    handleInputChange(e);
                    setPhoneError(null); // Clear error when user types
                  }}
                  className={`${inputClass} pl-12 ${phoneError ? 'border-red-500' : ''}`}
                  disabled={phoneStep !== "idle"} //|| emailVerificationStep !== 'verified'}
                />
              </div>

              {phoneStep === "idle" && (
                <button
                  type="button"
                  onClick={handleSendPhoneOtp}
                  disabled={isSendingPhoneOtp || formData.phone.length !== 10} //|| emailVerificationStep !== 'verified'}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
                  //title={emailVerificationStep !== 'verified' ? "Please verify your email first" : ""}
                >
                  {isSendingPhoneOtp ? <Spinner /> : "Verify"}
                </button>
              )}

              {phoneStep === "verified" && (
                <span className="text-green-600 font-semibold">✔ Verified</span>
              )}
            </div>
            {phoneError && (
              <p className="mt-1 text-sm text-red-600">{phoneError}</p>
            )}
          </div>



          {/* PHONE OTP BOX */}
          {phoneStep === "pending" && (
            <div className="mt-2 p-3 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-indigo-200 dark:border-slate-600 shadow-sm space-y-2">

              <p className="text-xs text-center text-slate-700 dark:text-slate-300">
                Enter OTP sent to<br/>
                <strong className="text-indigo-600 dark:text-indigo-400 text-xs">+91 {formData.phone}</strong>
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={phoneOtp}
                  onChange={(e) =>
                    setPhoneOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg text-center text-base tracking-[0.2em] font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 dark:focus:ring-indigo-600 focus:outline-none transition text-sm"
                  maxLength={6}
                />

                <button
                  type="button"
                  onClick={handleVerifyPhoneOtp}
                  disabled={isVerifyingPhoneOtp}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {isVerifyingPhoneOtp ? <Spinner className="h-4 w-4" /> : "Confirm"}
                </button>
              </div>

              {phoneOtpError && (
                <p className="text-center text-xs text-red-600 dark:text-red-400 font-medium">
                  {phoneOtpError}
                </p>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendPhoneOtp}
                  disabled={countdown > 0}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium disabled:text-slate-400 disabled:cursor-not-allowed transition">
                  Resend OTP {countdown > 0 ? `(${countdown}s)` : ""}
                </button>
              </div>
            </div>
          )}




          {/* EEC AGENT QUESTION */}
          <div className="flex items-center gap-x-6">
            <label className="flex items-center whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
              EEC is my admissions agent?<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center gap-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isEECAgent"
                  value="Yes"
                  checked={formData.isEECAgent === 'Yes'}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"
                  disabled={phoneStep !== "verified"}
                  required
                />
                <span className="text-slate-700 dark:text-slate-300">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="isEECAgent"
                  value="No"
                  checked={formData.isEECAgent === 'No'}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 accent-indigo-600 dark:accent-indigo-500"
                  disabled={phoneStep !== "verified"}
                  required
                />
                <span className="text-slate-700 dark:text-slate-300">No</span>
              </label>
            </div>
          </div>

          {/* BRANCH DROPDOWN - Only show if EEC Agent is Yes */}
          {formData.isEECAgent === 'Yes' && (
            <div>
              <label className={labelClass}>Choose Branch<span className="text-red-500 ml-1">*</span></label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={inputClass}
                disabled={phoneStep !== "verified"}
                required={formData.isEECAgent === 'Yes'}
              >
                <option value="">Select Branch</option>
                {BRANCHES.map((branch) => (
                  <option key={branch.identifier} value={branch.identifier}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* TARGET COUNTRY */}
          <div>
            <label className={labelClass}>For Which Country You Are Targeting<span className="text-red-500 ml-1">*</span></label>
            <select
              name="targetCountry"
              value={formData.targetCountry}
              onChange={handleInputChange}
              className={inputClass}
              disabled={phoneStep !== "verified"}
              required
            >
              {TARGET_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

         
          {/* STATE + CITY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>State</label>
              <select name="state" value={formData.state}
                onChange={handleInputChange}
                className={inputClass}
                disabled={phoneStep !== "verified"}>
                <option value="">Select State</option>
                {STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={inputClass}
                disabled={!formData.state || phoneStep !== "verified"}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>



 {/* VISA TYPE */}
 <div>
            <label className={labelClass}>Which Australia Visa are you planning for?<span className="text-red-500 ml-1">*</span></label>
            <select
              name="visaType"
              value={formData.visaType}
              onChange={handleInputChange}
              className={inputClass}
              disabled={phoneStep !== "verified"}
              required
            >
              <option value="">Select Visa Type</option>
              <option value="Study Visa">Study Visa</option>
              <option value="PR Visa">PR Visa</option>
              <option value="Work Visa">Work Visa</option>
            </select>
          </div>

          {/* EDUCATION LEVEL */}
          <div>
            <label className={labelClass}>What do you want to study?<span className="text-red-500 ml-1">*</span></label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              className={inputClass}
              disabled={phoneStep !== "verified"}
              required
            >
              <option value="">Select Education Level</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
            </select>
          </div>

          {/* PARENT'S ANNUAL INCOME */}
          <div>
            <label className={labelClass}>Parent's Annual Income (Income Tax Return)<span className="text-red-500 ml-1">*</span></label>
            <select
              name="parentAnnualIncome"
              value={formData.parentAnnualIncome}
              onChange={handleInputChange}
              className={inputClass}
              disabled={phoneStep !== "verified"}
              required
            >
              <option value="">Select Income Range</option>
              <option value="Income tax return > 35 lakhs">Income tax return &gt; 35 lakhs</option>
              <option value="Income tax return > 15 lakhs">Income tax return &gt; 15 lakhs</option>
              <option value="Income tax return > 7 lakhs">Income tax return &gt; 7 lakhs</option>
              <option value="Income tax return < 7 lakhs">Income tax return &lt; 7 lakhs</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={
              isRegistering ||
              //emailVerificationStep !== "verified" ||
              phoneStep !== "verified"
            }
            className="relative w-full py-3 bg-indigo-600 text-white rounded-lg mt-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRegistering && (
              <span className="absolute left-4">
                <Spinner className="h-5 w-5 text-white" />
              </span>
            )}
            <span className={isRegistering ? 'opacity-80' : ''}>Create Account &amp; Get Started</span>
          </button>

        </form>

        {/* ALREADY REGISTERED BUTTON */}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="group relative w-full py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 text-slate-700 dark:text-slate-200 font-semibold rounded-lg mt-3 transition-all duration-300 flex items-center justify-center min-h-[44px] border border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Button content */}
          <span className="relative flex items-center gap-2">
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-10deg]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Already Registered? Sign In
          </span>
        </button>

        {error && (
          <p className="mt-2 text-center text-xs text-red-600">{error}</p>
        )}

      </div>
    </div>
  );
};

export default LoginSignupModal;

