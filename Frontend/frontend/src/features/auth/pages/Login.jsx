import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useSelector } from "react-redux";
import GoogleButton from "../component/GoogleButton.jsx";
import { Link } from "react-router";
import loginImage from "../assets/new.jpeg";
import { useNavigate } from "react-router";
const Login = () => {
  const { handleLogin } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);
  const navigator = useNavigate()
  const [emailOrContact, setEmailOrContact] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const payload = {
      email: emailOrContact.includes("@") ? emailOrContact : "",
      contact: !emailOrContact.includes("@") ? emailOrContact : "",
      password,
    };

    await handleLogin(payload);
    navigator("/")
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://snitch-yi0u.onrender.com/api/auth/google";
    navigator(to="/")
  };

  return (
    <div className="h-screen grid md:grid-cols-2">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block relative h-screen w-full overflow-hidden">

        <img
          src={loginImage}
          alt="fashion model"
          className="absolute inset-0 w-full h-full object-container scale-105"
        />

        {/* Overlay */}
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-semibold tracking-wide">
            STYLEHUB
          </h1>
          <p className="text-sm opacity-90 mt-2">
            Discover premium fashion curated for modern lifestyles
          </p>
        </div>

      </div>


      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center bg-white px-6 md:h-screen md:overflow-y-auto">

        <div className="w-full max-w-md py-10">

          {/* Heading */}
          <h2 className="text-3xl font-semibold mb-2">
            Welcome back
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Login to continue shopping premium fashion
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          {/* Google login */}
          <GoogleButton onClick={handleGoogleLogin} />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400 text-xs tracking-wide">
              OR LOGIN WITH EMAIL
            </span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Inputs */}
          <div className="space-y-5">

            <input
              type="text"
              placeholder="Email or contact number"
              value={emailOrContact}
              onChange={(e) => setEmailOrContact(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            {/* Login button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </div>

          {/* Register redirect */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-black font-medium hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;