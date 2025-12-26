import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";

export default function AuthUI() {
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Search and find your dream job is now easier than ever. Just browse a job and apply if you need to.",
      author: "Mas Parjono",
      role: "UI Designer at Google",
    },
    {
      quote:
        "Amazing platform for job hunting. Found my perfect role within weeks!",
      author: "Sarah Chen",
      role: "Product Manager at Meta",
    },
    {
      quote: "The best job board I've ever used. Highly recommended!",
      author: "Alex Rodriguez",
      role: "Senior Engineer at Apple",
    },
  ];

  const current = testimonials[testimonialIndex];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-4 relative">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Main Auth Card */}
      <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl flex flex-col md:flex-row  max-w-4xl w-full relative z-10">
        {/* Left Panel - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-orange-400/20">
          {/* Logo */}
          <div className="flex items-center gap-1 mb-8">
            <img src="https://aia.in.net/crm/public/assets/images/logo/new_retina_logos.webp"></img>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-white/75 text-sm mb-8">
            Please Enter your Account details
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-white/65 text-sm font-medium mb-3">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-black/45 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-300 transition shadow-inner"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-white/65 text-sm font-medium mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full bg-black/45 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-300 transition shadow-inner"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-end mb-8 text-sm">
            <a
              href="#"
              className="text-orange-300 hover:text-orange-200 transition font-medium"
            >
              Forgot Password
            </a>
          </div>

          <button className="w-full py-3 rounded-full bg-gradient-to-r from-orange-300 to-pink-400 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition duration-300 transform hover:scale-105 mb-8">
            Sign in
          </button>
        </div>

        <div
          className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex flex-col justify-between relative overflow-visible"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 50px) 0, calc(100% - 50px) 0, 100% 0, 100% 50px, 100% 50px, 100% 100%, 0 100%, 0 0)",
            borderTopRightRadius: "50px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "60px",
              height: "60px",
              background:
                "linear-gradient(135deg, rgb(15, 12, 41) 0%, rgb(48, 43, 99) 50%, rgb(36, 36, 62) 100%)",
              borderRadius: "0 0 0 60px",
              zIndex: 20,
            }}
          ></div>
          <div className="absolute bottom-20 -right-20 w-64 h-64 opacity-30 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="5"
                  stroke="#5B7CFA"
                  strokeWidth="1.5"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              What's our Jobseekers Said.
            </h2>

            <div className="mb-8">
              <p className="text-3xl text-white/40 mb-4">"</p>
              <p className="text-white/90 leading-relaxed mb-8 text-lg">
                {current.quote}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-white font-semibold">{current.author}</p>
              <p className="text-white/60 text-sm">{current.role}</p>
            </div>
          </div>

          <div className="flex gap-3 relative z-10">
            <button
              onClick={handlePrevTestimonial}
              className="w-12 h-12 rounded-lg bg-orange-300 hover:bg-orange-400 text-white flex items-center justify-center transition transform hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="w-12 h-12 rounded-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition transform hover:scale-110"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-40 w- md:w-[400px] bg-white rounded-2xl rounded-br-none p-6 shadow-2xl z-[999]">
          <h3 className="text-slate-900 font-bold mb-2">
            Get your right job and right place apply now
          </h3>

          <p className="text-slate-600 text-sm mb-4">
            Be among the first founders to experience the easiest way to start
            run a business.
          </p>

          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-white"
                style={{ marginLeft: i > 0 ? "-12px" : "0" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
