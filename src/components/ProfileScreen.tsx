import React from "react";
import { BottomNavigation } from "./BottomNavigation";
import {
  Settings,
  Award,
  Flame,
  LogOut,
  User,
} from "lucide-react";

interface ProfileScreenProps {
  userName?: string;
  userType?: "guest" | "user";
  onLogout?: () => void;
  onNavigate?: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName = "Pengguna",
  userType = "user",
  onLogout,
  onNavigate,
}) => {
  const isGuest = userType === "guest";

  return (
    <div className="w-full max-w-sm mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between rounded-3xl shadow-lg overflow-hidden">

      <div className="p-5 flex-1 space-y-5">

        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-selaras-dark">
            Profil
          </h1>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-selaras-teal/20 flex items-center justify-center border-2 border-selaras-teal text-lg font-bold text-selaras-primary">
            {isGuest ? (
              <User className="w-6 h-6 text-selaras-primary" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h2 className="text-sm font-bold text-selaras-dark">
              {isGuest ? "Pengguna Tamu" : userName}
            </h2>

            <p className="text-xs text-gray-400">
              {isGuest ? "Mode Akses Tamu" : "Siswa"}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-2">
          <div className="flex justify-between text-xs">
            <span>Kemampuan Bahasa Isyarat</span>

            <span className="font-bold text-selaras-primary">
              {isGuest ? "0 / 500" : "350 / 500"}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-selaras-primary"
              style={{
                width: isGuest ? "0%" : "70%",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">
              Total Poin
            </p>

            <p className="text-xl font-bold">
              {isGuest ? "0" : "350"}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">
              Badge
            </p>

            <div className="flex justify-center items-center gap-1 mt-1">
              <Award className="w-4 h-4 text-orange-500" />

              <span className="text-xl font-bold">
                {isGuest ? "0" : "12"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm">
              Streak
            </p>

            <p className="text-orange-500 font-bold">
              {isGuest ? "0 hari" : "7 hari 🔥"}
            </p>
          </div>

          <Flame className="text-orange-500 w-6 h-6" />
        </div>

        <button
          onClick={onLogout}
          className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold"
        >
          <div className="flex justify-center items-center gap-2">
            <LogOut className="w-4 h-4" />

            {isGuest
              ? "Keluar Mode Tamu"
              : "Logout"}
          </div>
        </button>

      </div>

      <BottomNavigation
        activeTab="profile"
        onNavigate={onNavigate}
      />

    </div>
  );
};