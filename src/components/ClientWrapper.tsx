"use client";

import React, { useEffect, useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { HomeScreen } from "./HomeScreen";
import { ScannerScreen } from "./ScannerScreen";
import { HistoryScreen } from "./HistoryScreen";
import { RewardScreen } from "./RewardScreen";
import { ProfileScreen } from "./ProfileScreen";

export default function ClientWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [currentScreen, setCurrentScreen] = useState("home");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");

    if (savedName) {
      setUser(savedName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (
    mode: "login" | "register" | "guest",
    userName?: string
  ) => {
    const name = userName || "Pengguna";

    localStorage.setItem("userName", name);

    setUser(name);
    setIsLoggedIn(true);
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");

    setUser("");
    setIsLoggedIn(false);
    setCurrentScreen("home");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <LoginScreen onLogin={handleLogin} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-4">
      {currentScreen === "home" && (
        <HomeScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === "scanner" && (
        <ScannerScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === "history" && (
        <HistoryScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === "reward" && (
        <RewardScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === "profile" && (
        <ProfileScreen
          userName={user}
          userType={user === "Tamu" ? "guest" : "user"}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}

      {currentScreen === "avatar" && (
        <div className="w-full max-w-sm min-h-screen bg-white rounded-3xl shadow-lg flex flex-col justify-between p-6">
          <div className="text-center mt-10">
            <h1 className="text-xl font-bold text-[#0F4C81]">
              Mode Avatar Digital
            </h1>

            <p className="text-xs text-gray-500 mt-2">
              Fitur Avatar Digital sedang dalam pengembangan.
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen("home")}
            className="w-full py-3 rounded-xl bg-[#0F4C81] text-white text-sm font-semibold"
          >
            Kembali ke Beranda
          </button>
        </div>
      )}
    </main>
  );
}