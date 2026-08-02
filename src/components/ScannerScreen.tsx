import React from "react";
import { RefreshCw } from "lucide-react";

interface ScannerScreenProps {
  onNavigate?: (screen: string) => void;
}

export const ScannerScreen: React.FC<ScannerScreenProps> = ({
  onNavigate,
}) => {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-black text-white flex flex-col justify-between overflow-hidden">
      {/* Top Status Bar */}
      <div className="p-4 flex justify-between items-center z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-selaras-green text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </span>

        <button className="p-2 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Camera Live Bounding Box Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-56 h-56 border-2 border-dashed border-selaras-teal/80 rounded-3xl flex items-center justify-center">
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-selaras-teal" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-selaras-teal" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-selaras-teal" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-selaras-teal" />

          <span className="text-[11px] text-white/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
            Mendeteksi gerakan...
          </span>
        </div>
      </div>

      {/* Bottom Waveform */}
      <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/80 to-transparent pb-24">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-1 h-5">
            {[40, 70, 30, 90, 60, 100, 40, 80, 50, 30].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-selaras-teal rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <span className="text-[10px] text-gray-300">
            Memproses gerakan...
          </span>
        </div>

        <button
          onClick={() => onNavigate?.("home")}
          className="w-full mt-4 py-3 rounded-xl bg-white text-black text-sm font-semibold"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};