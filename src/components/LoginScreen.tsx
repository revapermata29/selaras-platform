"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LoginScreenProps {
  onLogin: (mode: "login" | "register" | "guest", userName?: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.endsWith("@belajar.ac.id")) {
      setErrorMsg("Email harus menggunakan domain @belajar.ac.id");
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        setErrorMsg("Kata sandi dan konfirmasi kata sandi tidak cocok.");
        return;
      }
      const nameToSave = fullName.trim() || email.split("@")[0];
      localStorage.setItem("userName", nameToSave);
      onLogin("register", nameToSave);
    } else {
      const nameToSave = email.split("@")[0];
      localStorage.setItem("userName", nameToSave);
      onLogin("login", nameToSave);
    }
  };

  const handleGuestLogin = () => {
    const guestName = "Tamu";
    localStorage.setItem("userName", guestName);
    onLogin("guest", guestName);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md font-sans flex flex-col items-center">
      
      {/* 1. Logo Aplikasi */}
      <div className="mb-3">
        <Image
          src="/Logo_Selaras.png"
          alt="Logo Selaras"
          width={80}
          height={80}
          className="w-20 h-auto mx-auto object-contain"
        />
      </div>

      <div className="text-center mb-6 w-full">
        <h1 className="text-2xl font-bold text-[#0F4C81]">Selaras</h1>
        <p className="text-xs text-gray-500 mt-1">
          {isRegister ? "Buat akun baru Anda" : "Masuk ke akun Anda"}
        </p>

        {/* 2. Karakter */}
        <div className="my-4 mx-auto w-full max-w-[260px] h-[160px] flex items-center justify-center relative">
          <Image
            src="/Karakter.png"
            alt="Karakter Selaras"
            width={260}
            height={160}
            className="object-contain max-h-full w-auto"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 w-full p-3 bg-red-50 text-red-600 text-xs rounded-lg text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {isRegister && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email (@belajar.ac.id)
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@belajar.ac.id"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Kata Sandi
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 bg-[#0F4C81] text-white text-sm font-semibold rounded-lg hover:bg-[#0c3d68] transition"
        >
          {isRegister ? "Daftar" : "Masuk"}
        </button>
      </form>

      <div className="mt-4 text-center space-y-2 w-full">
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setErrorMsg("");
          }}
          className="text-xs text-[#0F4C81] font-semibold hover:underline"
        >
          {isRegister
            ? "Sudah punya akun? Masuk"
            : "Belum punya akun? Daftar sekarang"}
        </button>

        <div>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Masuk sebagai Tamu
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;