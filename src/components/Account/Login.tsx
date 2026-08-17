"use client";

import Image from "next/image";
import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FiUser, FiPhone } from "react-icons/fi";

type Step = "email" | "otp" | "register";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface LoginProps {
  setAccountOpen: (open: boolean) => void;
  /** Called after a successful login or registration (instead of page reload) */
  onSuccess?: () => void;
}

const Login = ({ setAccountOpen, onSuccess }: LoginProps) => {
  const [step, setStep] = useState<Step>("email");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [resendTimer, setResendTimer] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const startResendTimer = () => {
    setResendTimer(60);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleRequestOTP = async () => {
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    // Validate email
    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-email-otp", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to send OTP.");

        return;
      }

      // Keep normalized email
      setEmail(normalizedEmail);

      setOtp("");

      setSuccess("OTP has been sent to your email.");

      setStep("otp");

      startResendTimer();
    } catch (error) {
      console.error("REQUEST OTP ERROR:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    const normalizedOTP = otp.trim();

    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }

    if (!/^\d{6}$/.test(normalizedOTP)) {
      setError("Please enter the 6-digit OTP.");

      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email-otp", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: normalizedEmail,
          otp: normalizedOTP,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid OTP.");

        return;
      }


      if (data.isExistingUser === true || data.nextStep === "authenticated") {
        setSuccess("Login successful.");

        setTimeout(() => {
          setAccountOpen(false);
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.reload();
          }
        }, 700);

        return;
      }

      if (data.needsProfile === true || data.nextStep === "register") {
        setSuccess("Email verified successfully.");

        setStep("register");

        return;
      }

      // Unexpected response
      setError("Unable to determine the next step.");
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    const firstName = formData.firstName.trim();

    const lastName = formData.lastName.trim();

    const phone = formData.phone.trim();

    if (!firstName) {
      setError("First name is required.");

      return;
    }

    if (!lastName) {
      setError("Last name is required.");

      return;
    }

    if (!phone) {
      setError("Phone number is required.");

      return;
    }

    // Example phone validation
    if (!/^\d{10,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");

      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim().toLowerCase(),

          firstName,

          lastName,

          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");

        return;
      }

      setSuccess("Account created successfully.");

      setTimeout(() => {
        setAccountOpen(false);
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.reload();
        }
      }, 700);
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0 || loading) {
      return;
    }

    setOtp("");
    setError("");
    setSuccess("");

    await handleRequestOTP();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleBack = () => {
    if (loading) return;

    setError("");
    setSuccess("");
    setOtp("");

    setStep("email");
  };

  const handleClose = () => {
    if (loading) return;

    setAccountOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="relative flex w-full max-w-3xl m-auto overflow-hidden rounded-2xl bg-white shadow-2xl">

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-6 top-6 z-20 cursor-pointer text-xl text-gray-600 transition hover:text-[#7A1F1F]"
        >
          ✕
        </button>

        <div className="relative hidden w-1/2 lg:block">
          <Image
            src="/images/banner4.jpg"
            alt="Jewellery"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <h2 className="font-serif text-4xl font-bold">
              Discover Timeless Beauty
            </h2>

            <p className="mt-3 text-sm text-white/90">
              Explore our collection of gemstones and jewellery crafted with
              elegance.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-1/2 lg:px-12">

          {step === "email" && (
            <>
              <h2 className="font-serif text-3xl font-bold text-gray-800">
                Welcome
              </h2>

              <p className="mt-3 text-gray-500">
                Login or create an account using your email.
              </p>

              {/* Email */}

              <div className="mt-10 flex w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm transition focus-within:border-[#7A1F1F] focus-within:ring-2 focus-within:ring-[#7A1F1F]/10">
                <div className="flex flex-1 items-center">
                  <MdOutlineMail className="ml-3 text-xl text-gray-500" />

                  <input
                    type="email"
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRequestOTP();
                      }
                    }}
                    placeholder="Enter Email"
                    autoComplete="email"
                    className="w-full p-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Error */}

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              {/* Button */}

              <button
                type="button"
                disabled={loading || !email.trim()}
                onClick={handleRequestOTP}
                className="mt-5 w-full cursor-pointer rounded-lg bg-[#7A1F1F] p-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#B8860B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Continue"}
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <button
                type="button"
                disabled={loading}
                onClick={handleBack}
                className="mb-5 w-fit text-sm text-gray-500 hover:text-[#7A1F1F]"
              >
                ← Change Email
              </button>

              <h2 className="font-serif text-3xl font-bold text-gray-800">
                Verify Email
              </h2>

              <p className="mt-3 text-gray-500">
                We sent a 6-digit verification code to
              </p>

              <p className="mt-1 break-all font-semibold text-[#7A1F1F]">
                {email}
              </p>

              {/* OTP */}

              <div className="mt-8 flex w-full items-center rounded-lg border border-gray-300 bg-white shadow-sm focus-within:border-[#7A1F1F] focus-within:ring-2 focus-within:ring-[#7A1F1F]/10">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  disabled={loading}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setOtp(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && otp.length === 6) {
                      handleVerifyOTP();
                    }
                  }}
                  placeholder="Enter 6-digit OTP"
                  className="w-full p-3 text-center text-lg font-semibold tracking-[0.5em] text-gray-800 outline-none placeholder:text-sm placeholder:tracking-normal placeholder:text-gray-400 disabled:bg-gray-50"
                />
              </div>

              {/* Error */}

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              {/* Success */}

              {success && (
                <p className="mt-3 text-sm text-green-600">{success}</p>
              )}

              {/* Verify */}

              <button
                type="button"
                disabled={loading || otp.length !== 6}
                onClick={handleVerifyOTP}
                className="mt-5 w-full cursor-pointer rounded-lg bg-[#7A1F1F] p-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#B8860B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              {/* Resend */}

              <div className="mt-5 text-center text-sm">
                {resendTimer > 0 ? (
                  <span className="text-gray-500">
                    Resend OTP in <strong>{resendTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleResendOTP}
                    className="cursor-pointer font-semibold text-[#7A1F1F] hover:text-[#B8860B] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          {step === "register" && (
            <>
              <h2 className="font-serif text-3xl font-bold text-gray-800">
                Complete Your Profile
              </h2>

              <p className="mt-3 text-gray-500">
                Your email has been verified. Please complete your profile.
              </p>

              {/* First Name */}

              <div className="mt-7 flex items-center rounded-lg border border-gray-300">
                <FiUser className="ml-3 text-gray-500" />

                <input
                  type="text"
                  value={formData.firstName}
                  disabled={loading}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="First Name"
                  autoComplete="given-name"
                  className="w-full p-3 text-sm outline-none disabled:bg-gray-50"
                />
              </div>

              {/* Last Name */}

              <div className="mt-3 flex items-center rounded-lg border border-gray-300">
                <FiUser className="ml-3 text-gray-500" />

                <input
                  type="text"
                  value={formData.lastName}
                  disabled={loading}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Last Name"
                  autoComplete="family-name"
                  className="w-full p-3 text-sm outline-none disabled:bg-gray-50"
                />
              </div>

              {/* Phone */}

              <div className="mt-3 flex items-center rounded-lg border border-gray-300">
                <FiPhone className="ml-3 text-gray-500" />

                <input
                  type="tel"
                  value={formData.phone}
                  disabled={loading}
                  onChange={(e) =>
                    handleChange("phone", e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Phone Number"
                  autoComplete="tel"
                  maxLength={15}
                  className="w-full p-3 text-sm outline-none disabled:bg-gray-50"
                />
              </div>

              {/* Error */}

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              {/* Success */}

              {success && (
                <p className="mt-3 text-sm text-green-600">{success}</p>
              )}

              {/* Create Account */}

              <button
                type="button"
                disabled={
                  loading ||
                  !formData.firstName.trim() ||
                  !formData.lastName.trim() ||
                  !formData.phone.trim()
                }
                onClick={handleRegister}
                className="mt-5 w-full cursor-pointer rounded-lg bg-[#7A1F1F] p-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#B8860B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </>
          )}

          <p className="mt-8 text-center text-xs text-gray-500">
            By continuing you agree to our{" "}
            <span className="cursor-pointer text-[#7A1F1F]">Terms</span> &{" "}
            <span className="cursor-pointer text-[#7A1F1F]">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
