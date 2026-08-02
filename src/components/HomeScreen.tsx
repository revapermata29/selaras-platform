"use client";

import React from "react";
import { BottomNavigation } from "./BottomNavigation";

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-sans shadow-lg rounded-3xl overflow-hidden border border-gray-100">
      {/* Header & Main Cards */}
      <div className="px-6 pt-10 pb-6 flex-1 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-[#0F4C81] tracking-tight">
            Pilih Mode Fitur
          </h1>
          <p className="text-xs text-gray-500 mt-1.5 font-normal">
            Pilih cara kamu berkomunikasi
          </p>
        </div>

        {/* Kartu Scanner */}
        <div
          onClick={() => onNavigate && onNavigate("scanner")}
          className="w-full bg-white rounded-3xl p-6 mb-5 shadow-sm border border-gray-100/80 flex flex-col items-center text-center cursor-pointer hover:shadow-md active:scale-[0.98] transition-all duration-200"
        >
          <div className="relative w-28 h-24 mb-4 flex items-center justify-center">
            <div className="absolute top-0 left-2 w-4 h-4 border-t-2 border-l-2 border-[#0F4C81] rounded-tl"></div>
            <div className="absolute top-0 right-2 w-4 h-4 border-t-2 border-r-2 border-[#0F4C81] rounded-tr"></div>
            <div className="absolute bottom-0 left-2 w-4 h-4 border-b-2 border-l-2 border-[#0F4C81] rounded-bl"></div>
            <div className="absolute bottom-0 right-2 w-4 h-4 border-b-2 border-r-2 border-[#0F4C81] rounded-br"></div>
            <div className="flex gap-1 text-4xl select-none">
              <span className="transform -scale-x-100">🖐️</span>
              <span>🖐️</span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-[#0F4C81]">Scanner</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed px-2">
            Terjemahkan gerakan isyarat menggunakan kamera
          </p>
        </div>

        {/* Kartu Avatar */}
        <div
          onClick={() => onNavigate && onNavigate("avatar")}
          className="w-full bg-[#EBF3F5] rounded-3xl p-6 shadow-sm flex flex-col items-center text-center cursor-pointer hover:bg-[#e2edf0] active:scale-[0.98] transition-all duration-200"
        >
          <div className="w-20 h-20 rounded-full bg-[#D2E4E8] flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-[#0F4C81]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#0F4C81]">Avatar</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed px-2">
            Gunakan avatar digital dari teks atau suara guru
          </p>
        </div>
      </div>

      <BottomNavigation activeTab="home" onNavigate={onNavigate} />
    </div>
  );
};