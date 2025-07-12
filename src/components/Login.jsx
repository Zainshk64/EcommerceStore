import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginBanner from "../assets/loginbanner.jpg";
import googleicon from "../assets/googleicon.png";
import { X } from "lucide-react";

const Login = () => {
  const [LogIn, SetLogin] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignUp = LogIn === "Sign Up";
    const endpoint = isSignUp ? "register" : "login";

    const payload = isSignUp
      ? {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }
      : {
          email: formData.email.trim(),
          password: formData.password,
        };

    try {
      const res = await fetch(`http://localhost:3000/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      if (isSignUp) {
        toast.success("Account created! Please sign in.");
        SetLogin("Sign In"); // switch to login form
        setFormData({ name: "", email: "", password: "" }); // clear fields
      } else {
        toast.success(`Login successful!`);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // navigate to home
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [EmailModal, setEmailModal] = useState(false);
  const [OtpModal, setOtpModal] = useState(false);

  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message); // "OTP sent to email"
        setEmailModal(false);
        setOtpModal(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message); // "OTP verified"
        setResetToken(data.resetToken);
        setOtpModal(false);
        setResetPasswordModal(true);
        // You may redirect to reset-password screen now or go back to login state
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset successful");
        setResetPasswordModal(false);
        setNewPassword("");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="py-10">
      {EmailModal && (
        <div className="fixed top-0 inset-0 z-50 flex justify-center items-center bg-black/10 h-screen">
          <div className="bg-white shadow-lg rounded-md relative md:w-1/3 p-5">
            <div className="absolute right-6">
              <X
                className="cursor-pointer"
                onClick={() => setEmailModal(false)}
              />
            </div>
            <h1 className="text-center text-2xl font-medium my-5">
              Enter Email to Verify OTP:
            </h1>
            <form onSubmit={handleSendOtp}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="my-5 pb-3 w-full focus:outline-none border-b"
                required
              />
              <input
                type="submit"
                value="Send OTP"
                className="p-2 w-full active:scale-105 bg-red-500 cursor-pointer text-white rounded-lg"
              />
            </form>
          </div>
        </div>
      )}
      {OtpModal && (
        <div className="fixed top-0 inset-0 z-50 flex justify-center items-center bg-black/10 h-screen">
          <div className="bg-white shadow-lg rounded-md relative md:w-1/3 p-5">
            <div className="absolute right-6">
              <X
                className="cursor-pointer"
                onClick={() => setOtpModal(false)}
              />
            </div>
            <h1 className="text-center text-2xl font-medium my-5">
              Enter OTP Sent to:
            </h1>
            <p className="text-center text-sm mb-2 text-gray-500">{email}</p>
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="my-5 pb-3 w-full focus:outline-none border-b"
                required
              />
              <input
                type="submit"
                value="Verify OTP"
                className="p-2 w-full active:scale-105 bg-green-600 cursor-pointer text-white rounded-lg"
              />
            </form>
          </div>
        </div>
      )}

      {resetPasswordModal && (
        <div className="fixed top-0 inset-0 z-50 flex justify-center items-center bg-black/10 h-screen">
          <div className="bg-white shadow-lg rounded-md relative md:w-1/3 p-5">
            <div className="absolute right-6">
              <X
                className="cursor-pointer"
                onClick={() => setResetPasswordModal(false)}
              />
            </div>
            <h1 className="text-center text-2xl font-medium my-5">
              Set New Password
            </h1>
            <form onSubmit={handleResetPassword}>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pb-3 w-full focus:outline-none border-b pr-10"
                  required
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer text-sm text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              <input
                type="submit"
                value="Reset Password"
                className="p-2 w-full active:scale-105 bg-red-500 cursor-pointer text-white rounded-lg"
              />
            </form>
          </div>
        </div>
      )}

      <div className="flex p-5 md:flex-row flex-col items-center justify-evenly">
        <div className="sm:w-1/2 mx-auto md:w-3/5 ">
          <img src={loginBanner} alt="" />
        </div>
        <div className="sm:w-1/2 mx-auto md:w-80 pt-10 sm:pt-20">
          <div>
            <h1 className="text-3xl text-red-500">
              {LogIn === "Sign Up"
                ? "Create an Account!"
                : "Login With Exclusive"}
            </h1>
            <p className="text-gray-500 text-sm">Enter your details Below.</p>
            <form onSubmit={handleSubmit}>
              <div className="py-5 space-y-5">
                {LogIn === "Sign Up" && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pb-2 focus:outline-none border-b"
                    required
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email or Phone Number"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pb-2 focus:outline-none border-b"
                  required
                />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pb-2 focus:outline-none border-b"
                  required
                />
                <p
                  onClick={() => setShowPass(!showPass)}
                  className="tracking-tighter cursor-pointer"
                >
                  {showPass ? "Hide Password" : "Show Password"}
                </p>
              </div>

              {LogIn === "Sign Up" ? (
                <input
                  type="submit"
                  value="Sign Up"
                  className="p-3 w-full active:scale-105 bg-red-500 cursor-pointer text-white rounded-lg"
                />
              ) : (
                <div className="flex justify-between items-center">
                  <input
                    type="submit"
                    value="Sign In"
                    className="px-4 py-2.5 active:scale-105 bg-red-500 cursor-pointer text-white rounded-lg"
                  />
                  <p
                    onClick={() => setEmailModal(true)}
                    className="text-red-500 cursor-pointer"
                  >
                    Forgot Password?
                  </p>
                </div>
              )}
            </form>

            {LogIn === "Sign Up" ? (
              <>
                <div className="border border-neutral-300 rounded-lg mt-4 flex items-center gap-5 justify-center p-2">
                  <img src={googleicon} alt="" className="w-5 h-5" />
                  Continue With Google
                </div>
                <p className="text-center my-3 text-gray-500">
                  Already have an account?{" "}
                  <span
                    className="underline active:scale-95 cursor-pointer"
                    onClick={() => SetLogin("Sign In")}
                  >
                    Sign In
                  </span>
                </p>
              </>
            ) : (
              <p className="text-center mt-7 text-gray-500">
                New here?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => SetLogin("Sign Up")}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
