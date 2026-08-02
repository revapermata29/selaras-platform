import React from "react";
import { Clock, Info } from "lucide-react";
import { BottomNavigation } from "./BottomNavigation";

interface HistoryScreenProps {
  userType?: "guest" | "user";
  onNavigate?: (screen: string) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  userType = "user",
  onNavigate,
}) => {
  const isGuest = userType === "guest";

  const historyItems = [
    {
      id: 1,
      text: "Selamat Pagi",
      mode: "Scanner",
      time: "10:30 WIB",
    },
    {
      id: 2,
      text: "Terima Kasih",
      mode: "Avatar",
      time: "Kemarin",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-sans shadow-lg rounded-3xl overflow-hidden border border-gray-100">
      <div className="p-5 flex-1 space-y-4">
        <h1 className="text-lg font-bold text-selaras-dark">
          Riwayat Penerjemahan
        </h1>

        {isGuest && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-amber-800 text-[11px]">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <span>
              Anda dalam <strong>Mode Tamu</strong>. Riwayat penerjemahan tidak
              akan disimpan secara permanen saat Anda keluar.
            </span>
          </div>
        )}

        <div className="space-y-2.5">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-xs font-bold text-selaras-dark">
                  {item.text}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Mode: {item.mode}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation
        activeTab="history"
        onNavigate={onNavigate}
      />
    </div>
  );
};