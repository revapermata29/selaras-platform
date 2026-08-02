import React from "react";
import { Award, Lock, LogIn } from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";

interface RewardScreenProps {
  userType?: "guest" | "user";
  onNavigate?: (screen: string) => void;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({
  userType = "user",
  onNavigate,
}) => {
  const isGuest = userType === "guest";

  if (isGuest) {
    return (
      <div className="w-full max-w-sm mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-sans shadow-lg rounded-3xl overflow-hidden border border-gray-100">
        <div className="p-6 flex-1 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-selaras-primary/10 rounded-full flex items-center justify-center text-selaras-primary">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-base font-bold text-selaras-dark">
            Fitur Dikunci
          </h2>

          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
            Sistem poin dan kuis pembelajaran hanya tersedia untuk pengguna
            terdaftar. Buat akun sekarang untuk mengumpulkan poin.
          </p>

          <button
            onClick={() => onNavigate?.("home")}
            className="mt-2 px-6 py-3 bg-selaras-primary text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2 hover:bg-selaras-primary/90 transition active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            Kembali
          </button>
        </div>

        <BottomNavigation
          activeTab="reward"
          onNavigate={onNavigate}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-sans shadow-lg rounded-3xl overflow-hidden border border-gray-100">
      <div className="p-5 flex-1 space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-selaras-dark">
            Poin & Hadiah
          </h1>

          <div className="bg-selaras-orange/10 text-selaras-orange px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Award className="w-4 h-4" />
            350 Poin
          </div>
        </div>

        <div className="bg-gradient-to-r from-selaras-orange to-amber-500 rounded-2xl p-5 text-white shadow-md">
          <p className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block font-semibold">
            Tantangan Harian
          </p>

          <h2 className="text-sm font-bold mt-2">
            Selesaikan Kuis Isyarat
          </h2>

          <p className="text-xs text-amber-100 mt-1">
            Dapatkan +50 poin setiap penyelesaian kuis.
          </p>

          <button className="mt-4 bg-white text-selaras-orange font-bold text-xs px-4 py-2 rounded-xl shadow hover:bg-amber-50 active:scale-95 transition">
            Mulai Kuis
          </button>
        </div>
      </div>

      <BottomNavigation
        activeTab="reward"
        onNavigate={onNavigate}
      />
    </div>
  );
};