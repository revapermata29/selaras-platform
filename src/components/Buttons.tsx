import React from 'react';

// Tombol Utama (Primary)
export const PrimaryButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-full py-3 px-6 bg-selaras-primary text-white rounded-xl text-sm font-semibold shadow-md shadow-selaras-primary/20 hover:bg-selaras-primary/90 active:scale-[0.99] transition-all"
  >
    {label}
  </button>
);

// Tombol Sekunder (Secondary/Outline)
export const SecondaryButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="w-full py-3 px-6 border border-selaras-primary text-selaras-primary bg-white rounded-xl text-sm font-semibold hover:bg-selaras-primary/5 active:scale-[0.99] transition-all"
  >
    {label}
  </button>
);