import React, { useState } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    // 🔥 Supabase Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // 🟢 Simpan TOKEN Supabase untuk ProtectedRoute
    const token = data.session?.access_token;
    if (token) {
      localStorage.setItem("token", token);
    }

    // 🟢 Redirect ke dashboard
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gray-200 rounded-xl shadow-xl -rotate-3 transform translate-y-2" />
          <div className="absolute inset-0 bg-white rounded-xl shadow-lg rotate-2 transform translate-y-1" />

          <div className="relative bg-white rounded-xl shadow-2xl border-4 border-white p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">Log in to continue</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email"
                    required
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-gray-700 transition-colors duration-300 text-gray-800"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiLock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    required
                    className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-gray-700 transition-colors duration-300 text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group mt-6 disabled:opacity-70"
              >
                {loading ? "Memproses..." : "Masuk"}
                {!loading && (
                  <FiArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
