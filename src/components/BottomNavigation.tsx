"use client";

import React from "react";

interface BottomNavigationProps {
  activeTab?: string;
  onNavigate?: (screen: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = "home",
  onNavigate,
}) => {
  return (
    <div className="w-full bg-white border-t border-gray-100 py-2.5 px-6 flex justify-around items-center">
      {/* Beranda */}
      <button
        onClick={() => onNavigate && onNavigate("home")}
        className={`flex flex-col items-center transition ${
          activeTab === "home" ? "text-[#0F4C81]" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="text-[11px] font-medium mt-1">Beranda</span>
      </button>

      {/* Riwayat */}
      <button
        onClick={() => onNavigate && onNavigate("history")}
        className={`flex flex-col items-center transition ${
          activeTab === "history" ? "text-[#0F4C81]" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-[11px] font-medium mt-1">Riwayat</span>
      </button>

      {/* Poin / Hadiah */}
      <button
        onClick={() => onNavigate && onNavigate("reward")}
        className={`flex flex-col items-center transition ${
          activeTab === "reward" ? "text-[#0F4C81]" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
        <span className="text-[11px] font-medium mt-1">Poin</span>
      </button>

      {/* Profil */}
      <button
        onClick={() => onNavigate && onNavigate("profile")}
        className={`flex flex-col items-center transition ${
          activeTab === "profile" ? "text-[#0F4C81]" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[11px] font-medium mt-1">Profil</span>
      </button>
    </div>
  );
};