import React from 'react';
import { Volume2, Copy } from 'lucide-react';

export const TranslationResultScreen = () => {
  return (
    <div className="p-5 flex flex-col justify-between font-poppins pb-24 space-y-6">
      <h2 className="text-xs font-semibold text-gray-400 tracking-wide text-center mt-2">
        Hasil Terjemahan
      </h2>

      {/* Text Output Card */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <p className="text-xl font-bold text-selaras-dark leading-snug">
          Saya ingin bertanya.
        </p>
        <div className="flex justify-end">
          <button className="p-2 rounded-full bg-selaras-bg-light text-selaras-primary hover:bg-selaras-primary/10 transition">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Avatar Animation Card */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
        <p className="text-[11px] font-medium text-gray-400 mb-3 self-start">
          Animasi Isyarat
        </p>
        <div className="w-full h-40 bg-selaras-bg-light rounded-2xl flex items-center justify-center border border-gray-100">
          <div className="text-center text-xs text-gray-400">
            [ 3D Avatar Hand Sign Animation ]
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-gray-200 bg-white text-selaras-dark text-xs font-semibold hover:bg-gray-50 transition">
          <Copy className="w-3.5 h-3.5 text-gray-500" />
          Salin Teks
        </button>
        <button className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-selaras-primary text-white text-xs font-semibold shadow-md shadow-selaras-primary/20 hover:bg-selaras-primary/90 transition">
          <Volume2 className="w-3.5 h-3.5" />
          Dengarkan
        </button>
      </div>
    </div>
  );
};