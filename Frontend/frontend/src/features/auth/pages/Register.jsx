import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useSelector } from "react-redux";
import GoogleButton from "../component/GoogleButton.jsx";
import {useNavigate ,Link } from "react-router";
import registerImage from "../assets/registerimage.jpeg";

const Register = () => {
  const { handleRegister } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);
   const navigate = useNavigate()
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const handleSubmit = async () => {
    const payload = {
      fullname,
      email,
      contact,
      password,
      isSeller,
    };

    const user =  await handleRegister(payload);
    if(user){
     navigate("/")
    }
    
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://snitch-yi0u.onrender.com/api/auth/google";
  };

  return (
    <div className="h-screen grid md:grid-cols-2">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block relative h-screen overflow-hidden">
        <img
          src={registerImage}
          alt="fashion model"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10 text-white">
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
            Create your account
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Join the premium clothing marketplace
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          {/* Google signup */}
          <GoogleButton onClick={handleGoogleLogin} />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400 text-xs tracking-wide">
              OR SIGN UP WITH EMAIL
            </span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Inputs */}
          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            <input
              type="text"
              placeholder="Contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            {/* Seller checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
                className="accent-black"
              />
              Register as Seller
            </label>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          {/* Login redirect */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;