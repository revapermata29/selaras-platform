# Implementation Plan: Selaras Platform

## Overview

Membangun Selaras Platform secara inkremental — mulai dari inisialisasi proyek, konfigurasi styling, tipe data, state management, navigasi, hingga seluruh halaman fitur. Setiap task menghasilkan kode yang bisa dijalankan dan diintegrasikan ke langkah berikutnya. Tidak ada backend; seluruh data menggunakan mock statis.

Stack: Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · React Hook Form · Zod · Jest + RTL + fast-check

---

## Tasks

- [ ] 1. Inisialisasi proyek Next.js 15 dan instalasi dependensi
  - [-] 1.1 Buat proyek Next.js 15 dengan TypeScript, Tailwind CSS, dan App Router menggunakan `npx create-next-app@latest`
    - Konfigurasi: TypeScript=yes, ESLint=yes, Tailwind=yes, `src/` directory=yes, App Router=yes, import alias `@/*`
    - Hapus boilerplate default (globals.css isi reset saja, page.tsx kosongkan)
    - _Requirements: 8.3, 11.1_
  - [-] 1.2 Install dependensi utama: `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`
    - Gunakan versi eksak (pin versi): contoh `framer-motion@11`, `react-hook-form@7`, `zod@3`
    - _Requirements: 9.1, 11.1_
  - [-] 1.3 Install shadcn/ui CLI dan inisialisasi: `npx shadcn@latest init`
    - Pilih style Default, base color Slate, CSS variables=yes
    - Install komponen: `button card input progress tabs dropdown-menu badge dialog`
    - _Requirements: 11.6_
  - [ ]* 1.4 Tambahkan font Poppins via `next/font/google` di root layout placeholder
    - _Requirements: 1.9_


- [ ] 2. Konfigurasi Tailwind CSS dengan brand color tokens
  - [~] 2.1 Edit `tailwind.config.ts` — tambahkan `extend.colors` dengan token semantik Selaras
    - Token: `primary` (#0F4C81), `secondary` (#2E8B57), `accent` (#FF9F1C), `teal` (#2EC4B6), `background` (#F8F9FA), `foreground` (#1A1A1A), `surface` (#FFFFFF)
    - Tambahkan `fontFamily.sans: ["Poppins", "sans-serif"]`
    - _Requirements: 11.7_
  - [~] 2.2 Update `src/app/globals.css` — impor font Poppins dari Google Fonts via `@import`, set `body` background ke `bg-background` dan warna teks `text-foreground`
    - Pastikan tidak ada CSS Modules atau inline style; hanya Tailwind utility class
    - _Requirements: 10.7, 11.7_


- [ ] 3. Definisikan semua tipe TypeScript di `src/types/`
  - [~] 3.1 Buat `src/types/user.ts` — interface `User` dan `Badge` sesuai desain
    - Field: `id`, `name` (max 50 chars), `role: "siswa"|"guru"|"tamu"`, `avatarUrl`, `totalPoints`, `badgeCount`, `streakDays`, `currentXP`, `nextLevelXP`, `badges: Badge[]`
    - `Badge`: `id`, `name`, `iconUrl`, `earnedAt` (ISO 8601)
    - _Requirements: 7.1, 11.4_
  - [~] 3.2 Buat `src/types/history.ts` — interface `HistoryItem`
    - Field: `id`, `translationText` (max 200 chars), `mode: "scanner"|"avatar"`, `timestamp` (ISO 8601), `isStarred: boolean`
    - _Requirements: 6.4, 11.4_
  - [~] 3.3 Buat `src/types/translation.ts` — interface `TranslationResult`
    - Field: `id`, `sourceMode`, `translatedText` (max 200 chars), `signAnimationId`, `audioDuration` (ms), `pointsEarned` (1–999)
    - _Requirements: 4.1, 5.3, 11.4_
  - [~] 3.4 Buat `src/types/reward.ts` — interface `RewardData`
    - Field: `pointsEarned` (1–999), `currentXP`, `nextLevelXP`, `message`
    - Export barrel `src/types/index.ts` yang meng-export semua tipe
    - _Requirements: 5.1, 5.3, 11.4_


- [ ] 4. Buat constants, mock data, Zod schemas, dan utility
  - [~] 4.1 Buat `src/constants/routes.ts` — objek `ROUTES` dengan semua path: `/`, `/home`, `/scanner`, `/avatar`, `/result`, `/reward`, `/history`, `/profile`
    - _Requirements: 8.4, 11.5_
  - [~] 4.2 Buat `src/constants/gamification.ts` — `POINTS_PER_SESSION`, `XP_PER_SESSION`, `STREAK_RESET_THRESHOLD_HOURS`
    - Buat `src/constants/navigation.ts` — array `NAV_ITEMS` dengan label, href, icon untuk 4 tab Bottom Navigation
    - _Requirements: 5.3, 8.1, 11.5_
  - [~] 4.3 Buat `src/lib/mock-data.ts` — `MOCK_USER`, `MOCK_HISTORY` (min 3 item: 1 scanner + 1 avatar + 1 lainnya), `MOCK_TRANSLATIONS`, `MOCK_AVATAR_RESPONSES`
    - `MOCK_HISTORY` harus mencakup item dengan `isStarred: true` dan `isStarred: false`
    - _Requirements: 6.8, 11.5_
  - [~] 4.4 Buat `src/lib/validations.ts` — `loginSchema` (email + password min 6), `avatarInputSchema` (min 1, max 500); export type `LoginFormValues` dan `AvatarInputValues`
    - _Requirements: 1.7, 12.1, 12.4_
  - [~] 4.5 Buat `src/lib/utils.ts` — fungsi `cn()` dari `clsx` + `tailwind-merge` (shadcn/ui pattern)
    - Buat `src/services/translation.service.ts` — fungsi `getMockTranslation(mode)` yang mengembalikan `TranslationResult` dari `MOCK_TRANSLATIONS`, dan `getAvatarResponse(text)` dengan fallback
    - _Requirements: 3.5, 12.3_


- [ ] 5. Implementasi React Context providers
  - [~] 5.1 Buat `src/lib/context/UserContext.tsx` — `"use client"` — `UserContext` dengan `UserProvider`
    - State: `user: User` di-seed dari `MOCK_USER`
    - Actions: `updatePoints(delta: number)`, `updateXP(delta: number)`
    - Pastikan `localStorage` hanya diakses dalam `useEffect` (bukan saat render)
    - _Requirements: 5.7, 7.1, 11.8_
  - [~] 5.2 Buat `src/lib/context/HistoryContext.tsx` — `"use client"` — `HistoryContext` dengan `HistoryProvider`
    - State: `items: HistoryItem[]` di-seed dari `MOCK_HISTORY`
    - Actions: `addItem(item: Omit<HistoryItem, "id">)`, `deleteItem(id: string)`, `toggleStar(id: string)`
    - `deleteItem` harus menghasilkan array baru yang tidak mengandung item dengan id tersebut
    - _Requirements: 4.8, 6.10, 11.8_


- [ ] 6. Implementasi custom hooks
  - [~] 6.1 Buat `src/hooks/useCamera.ts` — `"use client"` hook yang wrap `navigator.mediaDevices.getUserMedia`
    - Return type `CameraState`: `idle | requesting | { status: "active", stream: MediaStream } | { status: "error", reason: "NotAllowed"|"NotFound"|"NotReadable"|"Unknown", message: string }`
    - Pesan error per reason sesuai desain; cleanup `stream.getTracks().forEach(t => t.stop())` on unmount
    - _Requirements: 3.6, 3.7, 3.9_
  - [~] 6.2 Buat `src/hooks/useClipboard.ts` — state `"idle"|"copied"|"error"`
    - Coba `navigator.clipboard.writeText` dahulu; fallback ke `document.execCommand("copy")`
    - Reset ke "idle" setelah 2 detik menggunakan `setTimeout` dalam `useEffect`
    - _Requirements: 4.4, 4.5_
  - [~] 6.3 Buat `src/hooks/useTTS.ts` — hook simulasi text-to-speech menggunakan `MOCK_TRANSLATIONS`
    - State: `"idle"|"playing"|"error"`; expose fungsi `speak(text: string)`
    - Jika data tidak tersedia: set state ke "error" tanpa throw
    - _Requirements: 4.6, 4.7_
  - [~] 6.4 Buat `src/hooks/useReducedMotion.ts` — baca `window.matchMedia("(prefers-reduced-motion: reduce)")`
    - Return `boolean`; gunakan `useEffect` + event listener `change` untuk reaktivitas
    - Jika animasi reduced, konfigurasikan durasi ≤ 50ms
    - _Requirements: 9.7_


- [ ] 7. Setup App Router structure, root layout, dan (app) route group layout
  - [~] 7.1 Buat `src/app/layout.tsx` — Root layout (Server Component)
    - Load font Poppins via `next/font/google`, set `<html lang="id">`, `<body>` dengan `bg-background text-foreground`
    - Wrap children dengan `UserProvider` dan `HistoryProvider` dari context
    - _Requirements: 1.9, 8.3, 11.2_
  - [~] 7.2 Buat `src/app/(app)/layout.tsx` — AppLayout (Server Component)
    - Render `<main>` yang berisi `{children}` dan `<BottomNavigation />` di bawahnya
    - BottomNavigation diimport sebagai Client Component
    - _Requirements: 2.5, 8.6, 11.2_
  - [~] 7.3 Buat semua page placeholder untuk setiap route
    - `src/app/page.tsx`, `src/app/(app)/home/page.tsx`, `src/app/(app)/scanner/page.tsx`, `src/app/(app)/avatar/page.tsx`, `src/app/(app)/result/page.tsx`, `src/app/(app)/reward/page.tsx`, `src/app/(app)/history/page.tsx`, `src/app/(app)/profile/page.tsx`
    - Setiap page cukup return `<div>Page Name</div>` sementara; akan diisi di task berikutnya
    - Buat `src/app/not-found.tsx` dengan markup minimal (akan diselesaikan di task 17)
    - _Requirements: 8.3, 8.4_


- [ ] 8. Implementasi komponen navigasi dan shared components
  - [~] 8.1 Buat `src/components/navigation/BottomNavigation.tsx` — `"use client"`
    - Gunakan `usePathname()` untuk mendeteksi tab aktif; iterasi `NAV_ITEMS` dari constants
    - Render `<nav aria-label="Navigasi utama">` dengan 4 `<button>` atau `<Link>`
    - Tab aktif: warna `text-primary`; tidak aktif: `text-foreground/60`
    - Touch target minimum 44×44px via padding Tailwind
    - _Requirements: 8.1, 8.2, 8.7, 9.5, 10.3, 10.4_
  - [~] 8.2 Buat `src/components/cards/ModeCard.tsx` — Server Component
    - Props: `ModeCardProps` (mode, title, description, icon, href)
    - Gunakan shadcn `<Card>` sebagai base; wrap dalam Next.js `<Link>`
    - _Requirements: 2.2, 2.3, 2.4_
  - [~] 8.3 Buat `src/components/cards/StatCard.tsx` — Server Component
    - Props: `label: string`, `value: number`, `unit?: string`, `icon: React.ReactNode`
    - Digunakan di ProfileView untuk Poin, Badge, Streak
    - _Requirements: 7.4_
  - [~] 8.4 Buat `src/components/cards/HistoryCard.tsx` — Client Component
    - Props: `item: HistoryItem`, `onDelete: (id: string) => void`, `onToggleStar: (id: string) => void`
    - Tampilkan teks terjemahan max 100 chars + "...", label mode (Badge dari shadcn), timestamp DD/MM/YYYY HH:MM, tombol play, ikon bintang, dropdown-menu overflow dengan opsi "Hapus"
    - _Requirements: 6.4, 6.9_
  - [~] 8.5 Buat `src/components/layout/ErrorBoundary.tsx` — `"use client"` React class component
    - Tangkap error React di subtree; tampilkan fallback "Data tidak dapat dimuat. Silakan refresh halaman." dengan tombol Refresh
    - _Requirements: 5.8, 7.9_


- [ ] 9. Implementasi halaman Login (`/`)
  - [~] 9.1 Buat `src/components/forms/LoginForm.tsx` — `"use client"` — React Hook Form + Zod `loginSchema`
    - Fields: email (type="email") + password (type="password")
    - Validasi real-time; error inline di bawah setiap field; tombol submit disabled jika form invalid
    - Saat submit valid: navigasi ke `/home` menggunakan `useRouter`
    - Field lain TIDAK direset saat satu field invalid
    - _Requirements: 1.3, 1.7, 1.8_
  - [~] 9.2 Lengkapi `src/app/page.tsx` — Server Component halaman Login
    - Tampilkan logo + tagline "Koneksi, Harmoni, Komunikasi", ilustrasi, tombol "Masuk", tombol "Daftar", tautan "Masuk sebagai tamu"
    - "Masuk sebagai tamu" set flag di sessionStorage (dalam `useEffect`) lalu navigasi ke `/home`
    - Gunakan font Poppins, token warna Selaras
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.9_
  - [ ]* 9.3 Tulis unit test untuk LoginForm
    - Test: render form → semua field muncul; submit email whitespace-only → error muncul; submit data valid → navigasi dipanggil
    - _Requirements: 1.7_


- [ ] 10. Implementasi halaman Home — Pilih Mode Fitur (`/home`)
  - [~] 10.1 Lengkapi `src/app/(app)/home/page.tsx` — Server Component
    - Tampilkan heading "Pilih cara kamu berkomunikasi"
    - Render dua `<ModeCard>`: Scanner (ikon tangan, deskripsi sesuai Requirements 2.2) dan Avatar (ikon avatar, deskripsi sesuai Requirements 2.2)
    - Sematkan `<ErrorBoundary>` di sekitar konten utama
    - _Requirements: 2.1, 2.2, 2.7, 2.8_
  - [ ]* 10.2 Tulis unit test untuk HomePage
    - Test: kedua kartu mode tampil dengan teks yang benar; tab "Beranda" aktif di BottomNavigation
    - _Requirements: 2.1, 2.2, 2.7_


- [ ] 11. Implementasi halaman Scanner (`/scanner`)
  - [~] 11.1 Buat `src/features/scanner/WaveformAnimation.tsx` — `"use client"`
    - Framer Motion looping animation (5 bar, scale up/down) warna `bg-teal`
    - Gunakan `useReducedMotion()` — jika true, durasi ≤ 50ms
    - Interval animasi 1–3 detik per siklus
    - _Requirements: 3.3, 9.2, 9.7_
  - [~] 11.2 Buat `src/features/scanner/ScannerMode.tsx` — `"use client"`
    - Gunakan `useCamera()` hook; tampilkan `<video>` dengan `srcObject={stream}` saat state "active"
    - State "idle": tombol "Mulai Kamera"; state "requesting": loading spinner; state "active": badge LIVE + overlay teal + status bar "Mendeteksi gerakan..." + WaveformAnimation
    - State "error": pesan error spesifik per reason + tombol "Coba Lagi"
    - Setelah 3 detik kamera aktif: simulasikan deteksi → tampilkan "Memproses gerakan..." selama 500ms → navigasi ke `/result` dengan `translationId` di search params
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.9_
  - [~] 11.3 Lengkapi `src/app/(app)/scanner/page.tsx`
    - Server Component shell; render `<ScannerMode>` di dalam `<main>` dan `<ErrorBoundary>`
    - _Requirements: 3.6, 3.8_
  - [ ]* 11.4 Tulis unit test untuk ScannerMode
    - Test: render saat camera state "error" dengan reason "NotAllowed" → pesan error + tombol "Coba Lagi" tampil
    - Test: render saat camera state "idle" → tombol "Mulai Kamera" tampil
    - _Requirements: 3.7, 3.9_


- [ ] 12. Implementasi halaman Avatar (`/avatar`)
  - [~] 12.1 Buat `src/features/avatar/AvatarAnimation.tsx` — `"use client"`
    - Props: `animationId: string`, `isPlaying: boolean`
    - Framer Motion: setiap kata/frasa key map ke sekuens animasi berbeda (gunakan `MOCK_AVATAR_RESPONSES`)
    - Gunakan `useReducedMotion()` untuk durasi ≤ 50ms jika reduced
    - _Requirements: 12.6, 9.7_
  - [~] 12.2 Buat `src/components/forms/AvatarInputForm.tsx` — `"use client"` — React Hook Form + `avatarInputSchema`
    - Textarea max 500 chars dengan counter karakter; tombol submit; tombol mikrofon (simulasi voice input dari `MOCK_AVATAR_RESPONSES`)
    - Error inline jika kosong atau > 500 char; tombol submit disabled saat invalid atau loading
    - Props: `onSubmit: (text: string) => void`, `isLoading: boolean`
    - _Requirements: 12.1, 12.2, 12.4, 12.5_
  - [~] 12.3 Buat `src/features/avatar/AvatarMode.tsx` — `"use client"`
    - Compose `<AvatarInputForm>` + `<AvatarAnimation>`; state: `inputText`, `animationId`, `isProcessing`
    - Saat submit: set `isProcessing=true`, panggil `getAvatarResponse`, tunggu ≤ 3 detik lalu set `animationId` dan `isProcessing=false`
    - _Requirements: 12.3, 12.5, 12.8_
  - [~] 12.4 Lengkapi `src/app/(app)/avatar/page.tsx` — Server Component shell + `<AvatarMode>` + `<ErrorBoundary>`
    - _Requirements: 12.7, 12.8_
  - [ ]* 12.5 Tulis unit test untuk AvatarInputForm
    - Test: submit teks kosong → error inline muncul, callback tidak dipanggil
    - Test: submit teks 501 karakter → error inline muncul
    - Test: submit teks valid 10 karakter → callback `onSubmit` dipanggil dengan teks tersebut
    - _Requirements: 12.1, 12.4_


- [~] 13. Checkpoint — Validasi navigasi dan state dasar
  - Pastikan semua halaman dapat diakses via browser, BottomNavigation berfungsi, providers tersedia di seluruh (app) route group. Pastikan semua tests yang ada lolos. Tanyakan kepada user jika ada pertanyaan.

- [ ] 14. Implementasi halaman Result (`/result`)
  - [~] 14.1 Buat `src/features/result/ResultView.tsx` — `"use client"`
    - Baca `translationId` dari `useSearchParams()`; ambil `TranslationResult` dari `MOCK_TRANSLATIONS`
    - Tampilkan teks terjemahan (min font `text-2xl`/24sp, max 200 chars), seksi "Animasi Isyarat" placeholder, ikon audio (touch target 44×44dp, `aria-label`)
    - Tombol "Salin Teks": gunakan `useClipboard()`; saat "copied" → ikon check hijau 2 detik; saat "error" → pesan error inline
    - Tombol "Dengarkan": gunakan `useTTS()`; jika "error" → pesan informatif tanpa menutup halaman
    - Tombol "Selesai": panggil `addItem` dari HistoryContext, lalu navigasi ke `/reward` dengan `pointsEarned` dan data XP di search params
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_
  - [~] 14.2 Lengkapi `src/app/(app)/result/page.tsx` — Server Component shell yang `Suspense`-wrap `<ResultView>`
    - _Requirements: 4.9_
  - [ ]* 14.3 Tulis unit test untuk ResultView
    - Test: tombol "Salin Teks" diklik → konfirmasi visual "copied" muncul
    - Test: `useTTS` mengembalikan "error" → pesan error tampil tanpa navigasi
    - _Requirements: 4.5, 4.7_


- [ ] 15. Implementasi halaman Reward (`/reward`)
  - [~] 15.1 Buat `src/features/reward/RewardScreen.tsx` — `"use client"`
    - Baca `pointsEarned`, `currentXP`, `nextLevelXP` dari `useSearchParams()`
    - Framer Motion entrance: `hidden: { opacity: 0, scale: 0.8 }` → `visible: { opacity: 1, scale: 1.0 }` durasi 400ms ease-out (≤ 50ms jika `useReducedMotion() === true`)
    - Tampilkan: pesan "Kamu mendapatkan poin", ilustrasi medali/badge emas, "+ [N] Poin", subtitle "Kamu hebat! Terus berlatihlah", progress bar XP (`currentXP / nextLevelXP * 100`)
    - Progress bar clamp: selalu `0 ≤ percent ≤ 100`
    - Tombol "Lihat Badge" navigasi ke `/profile`; visible dan dapat diklik setelah animasi selesai (`onAnimationComplete`)
    - Panggil `updatePoints` dan `updateXP` dari UserContext saat mount (`useEffect`)
    - Jika update gagal (data undefined): tampilkan nilai sesi current, tidak crash
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 9.3, 9.7_
  - [~] 15.2 Lengkapi `src/app/(app)/reward/page.tsx` — Server Component shell + `<Suspense>` wrapper
    - _Requirements: 5.9_
  - [ ]* 15.3 Tulis unit test untuk RewardScreen
    - Test: render dengan `pointsEarned=50`, `currentXP=350`, `nextLevelXP=500` → "+ 50 Poin" dan progress bar 70% tampil
    - Test: tombol "Lihat Badge" ada di DOM setelah animasi
    - _Requirements: 5.1, 5.3, 5.5_


- [ ] 16. Implementasi halaman History (`/history`)
  - [~] 16.1 Buat `src/features/history/HistoryList.tsx` — `"use client"`
    - Konsumsi `HistoryContext`; state lokal: `searchQuery`, `activeFilter: "semua"|"scanner"|"avatar"`
    - Search bar dengan placeholder "Cari percakapan...", debounce 300ms
    - Tab filter "Semua" / "Scanner" / "Avatar" menggunakan shadcn `<Tabs>`
    - Filter logic: case-insensitive substring match pada `translationText` + filter `mode` jika bukan "semua"
    - Render `<HistoryCard>` per item; jika kosong setelah filter → empty state dengan ilustrasi + pesan kontekstual
    - `onDelete`: panggil `deleteItem` dari context; update tampilan langsung tanpa reload
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6, 6.9, 6.10_
  - [~] 16.2 Lengkapi `src/app/(app)/history/page.tsx` — Server Component shell + `<HistoryList>` + `<ErrorBoundary>`
    - _Requirements: 6.7, 6.8_
  - [ ]* 16.3 Tulis unit test untuk HistoryList
    - Test: render dengan `MOCK_HISTORY` → semua item tampil; pilih filter "Scanner" → hanya item scanner tampil
    - Test: daftar kosong setelah filter → empty state tampil
    - Test: klik "Hapus" item → item hilang dari daftar
    - _Requirements: 6.3, 6.6, 6.10_


- [ ] 17. Implementasi halaman Profile (`/profile`) dan 404
  - [~] 17.1 Buat `src/features/profile/ProfileView.tsx` — `"use client"`
    - Konsumsi `UserContext`; tampilkan avatar (`<Image alt="...">` deskriptif), nama (max 50 chars), role
    - Tombol settings (ikon gear, `aria-label="Buka pengaturan"`): klik → tampilkan panel/sheet pengaturan dalam ≤ 1 detik (gunakan shadcn `<Dialog>` atau collapse)
    - Progress bar XP: `currentXP / nextLevelXP * 100`, clamp 0–100
    - Tiga `<StatCard>`: Total Poin, Badge, Streak (N hari 🔥)
    - Subtitle motivasi: "Pertahankan streak-mu!"
    - Jika data undefined: `<ErrorBoundary>` menangkap dan tampilkan fallback
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.7, 7.8, 7.9_
  - [~] 17.2 Lengkapi `src/app/(app)/profile/page.tsx` — Server Component shell + `<ProfileView>` + `<ErrorBoundary>`
    - _Requirements: 7.6_
  - [~] 17.3 Lengkapi `src/app/not-found.tsx` — halaman 404 custom
    - Gunakan komponen dan token warna Selaras; tampilkan pesan ramah + link `<Link href="/home">Kembali ke Beranda</Link>`
    - _Requirements: 8.5_
  - [ ]* 17.4 Tulis unit test untuk ProfileView
    - Test: render dengan `MOCK_USER` → nama, poin, badge, streak tampil dengan nilai benar
    - Test: klik ikon settings → panel pengaturan muncul
    - _Requirements: 7.1, 7.4, 7.8_


- [~] 18. Checkpoint — Semua halaman lengkap
  - Navigasi lengkap Login → Home → Scanner → Result → Reward → Profile, serta History, semuanya berfungsi. BottomNavigation menandai tab yang benar di setiap halaman. Semua unit tests lolos. Tanyakan kepada user jika ada pertanyaan.

- [ ] 19. Implementasi page transition animations (Framer Motion)
  - [~] 19.1 Buat komponen `src/components/layout/PageTransition.tsx` — `"use client"`
    - Framer Motion `<AnimatePresence>` + `<motion.div>` dengan variant: `hidden: { opacity: 0, y: 10 }` → `visible: { opacity: 1, y: 0 }` durasi 200–300ms ease-out
    - Gunakan `useReducedMotion()` — jika true, skip animasi (durasi 0ms atau `initial=false`)
    - Wrap `{children}` di AppLayout dengan `<PageTransition>`
    - _Requirements: 9.1, 9.5, 9.7_
  - [~] 19.2 Tambahkan loading skeleton / spinner di halaman-halaman yang menggunakan `useSearchParams()`
    - Buat `src/components/ui/LoadingSkeleton.tsx` menggunakan shadcn pattern + Tailwind `animate-pulse`
    - Pasang sebagai fallback di `<Suspense>` wrapper di result dan reward page
    - _Requirements: 9.4_


- [ ] 20. Setup testing infrastructure (Jest + RTL + fast-check + jest-axe)
  - [~] 20.1 Install dan konfigurasi Jest dengan Next.js
    - Install: `jest`, `@types/jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
    - Buat `jest.config.ts` dengan `nextJest({ dir: "./" })`, `testEnvironment: "jsdom"`, `setupFilesAfterEach: ["<rootDir>/jest.setup.ts"]`
    - Buat `jest.setup.ts` yang import `@testing-library/jest-dom`
    - _Requirements: (Testing infrastructure)_
  - [~] 20.2 Install fast-check dan jest-axe
    - Install: `fast-check`, `jest-axe`, `@types/jest-axe`
    - Tambahkan import `jest-axe/extend-expect` di `jest.setup.ts`
    - Buat folder `__tests__/properties/` dan `__tests__/unit/` dan `__tests__/accessibility/`
    - _Requirements: (Testing infrastructure)_


- [ ] 21. Property-based tests (fast-check) — 10 properties
  - [ ]* 21.1 Tulis property test untuk Property 1: Validasi form login menolak input semua-whitespace
    - File: `__tests__/properties/login-validation.property.test.ts`
    - `fc.string({ minLength: 1 }).filter(s => s.trim() === "")` → `loginSchema.safeParse` HARUS `success: false`
    - Minimum 100 iterasi; tag komentar: `// Feature: selaras-platform, Property 1`
    - **Validates: Requirements 1.7**
  - [ ]* 21.2 Tulis property test untuk Property 2: Filter riwayat adalah subset dari daftar lengkap
    - File: `__tests__/properties/history-filter.property.test.ts`
    - Arbitrary: array `HistoryItem` + filter `"scanner"|"avatar"` → semua item hasil filter `.mode === filter` dan `count ≤ total`
    - **Validates: Requirements 6.3**
  - [ ]* 21.3 Tulis property test untuk Property 3: Pencarian riwayat bersifat case-insensitive
    - File: `__tests__/properties/history-filter.property.test.ts` (lanjutan atau file terpisah)
    - Arbitrary: array `HistoryItem` + query string → semua item hasil mengandung query (toLower) dan `count ≤ total`
    - **Validates: Requirements 6.5**
  - [ ]* 21.4 Tulis property test untuk Property 4: Round-trip serialisasi HistoryItem
    - File: `__tests__/properties/history-serialization.property.test.ts`
    - Arbitrary valid `HistoryItem` → `JSON.parse(JSON.stringify(item))` deep equal ke original
    - **Validates: Requirements 6.4, 11.4**
  - [ ]* 21.5 Tulis property test untuk Property 5: AvatarInput menolak string kosong dan > 500 chars
    - File: `__tests__/properties/avatar-validation.property.test.ts`
    - Empty/whitespace → error; length 1–500 non-whitespace → success; length > 500 → error
    - **Validates: Requirements 12.1, 12.4**
  - [ ]* 21.6 Tulis property test untuk Property 6: `pointsEarned` selalu dalam rentang 1–999
    - File: `__tests__/properties/gamification.property.test.ts`
    - Panggil `getMockTranslation` dengan mode arbitrary → `1 ≤ result.pointsEarned ≤ 999`
    - **Validates: Requirements 5.3**
  - [ ]* 21.7 Tulis property test untuk Property 7: XP progress bar tidak melebihi target
    - File: `__tests__/properties/gamification.property.test.ts`
    - Arbitrary `User` valid → `0 ≤ currentXP ≤ nextLevelXP` dan `percent = currentXP/nextLevelXP*100` dalam `[0, 100]`
    - **Validates: Requirements 5.5, 7.3**
  - [ ]* 21.8 Tulis property test untuk Property 8: Animasi menghormati `prefers-reduced-motion`
    - File: `__tests__/properties/animation.property.test.ts`
    - Mock `useReducedMotion()` return `true`; arbitrary durasi animasi → durasi yang dikonfigurasi ≤ 50ms
    - **Validates: Requirements 9.7**
  - [ ]* 21.9 Tulis property test untuk Property 9: Bottom Navigation menandai tepat satu tab aktif
    - File: `__tests__/properties/bottom-nav.property.test.ts`
    - Arbitrary pathname dari `ROUTES` values → `getActiveTab(pathname)` mengembalikan tepat 1 tab aktif dari 4
    - **Validates: Requirements 8.2**
  - [ ]* 21.10 Tulis property test untuk Property 10: Penghapusan item riwayat mengurangi daftar tepat satu item
    - File: `__tests__/properties/history-delete.property.test.ts`
    - Arbitrary array `HistoryItem` (n ≥ 1) + arbitrary valid id → setelah delete, length = n−1 dan id tidak ada
    - **Validates: Requirements 6.9, 6.10**


- [ ] 22. Unit tests tambahan (Jest + RTL) — komponen kunci
  - [ ]* 22.1 Tulis unit test untuk BottomNavigation
    - Test: render di setiap pathname dari `ROUTES` → tepat satu tab memiliki class/aria aktif
    - _Requirements: 8.1, 8.2_
  - [ ]* 22.2 Tulis unit test untuk RewardScreen
    - Test: render dengan poin dan XP valid → semua teks reward tampil dengan nilai benar
    - _Requirements: 5.1, 5.3, 5.5_
  - [ ]* 22.3 Tulis integration test untuk navigasi flow
    - Test: Login → Home → Scanner (mock camera) → Result → Reward → Profile menggunakan RTL + `MemoryRouter`
    - _Requirements: 2.3, 3.5, 4.8, 5.6_
  - [ ]* 22.4 Tulis integration test untuk HistoryContext persistence
    - Test: `addItem` → item muncul di `HistoryList`; `deleteItem` → item hilang
    - _Requirements: 4.8, 6.10_

- [ ] 23. Aksesibilitas audit setup (jest-axe)
  - [ ]* 23.1 Tulis axe accessibility test untuk halaman-halaman utama
    - File: `__tests__/accessibility/pages.a11y.test.ts`
    - Test setiap halaman (Login, Home, Scanner, Avatar, Result, Reward, History, Profile) dengan `axe(container)` → 0 violations
    - _Requirements: 10.2, 10.3, 10.4, 10.5, 10.6_
  - [ ]* 23.2 Tulis axe accessibility test untuk komponen interaktif
    - Test: BottomNavigation, LoginForm, AvatarInputForm, HistoryCard, HistoryList → 0 violations
    - _Requirements: 10.2, 10.3, 10.4_

- [~] 24. Checkpoint final — Semua tests lolos
  - Jalankan `jest --run` (atau `npx jest`) — semua unit tests, property tests, dan axe tests harus lolos. Perbaiki semua error dan warning TypeScript. Tanyakan kepada user jika ada pertanyaan sebelum dianggap selesai.


---

## Notes

- Task yang ditandai `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirement spesifik untuk traceability
- Checkpoint memastikan validasi inkremental setelah setiap fase besar
- Property tests (Property 1–10) memvalidasi invariant universal; unit tests memvalidasi contoh spesifik dan conditional rendering
- Jangan modifikasi file di `src/components/ui/` yang di-generate oleh shadcn/ui CLI
- Seluruh styling WAJIB menggunakan Tailwind utility class; tidak ada CSS Modules atau inline style
- `localStorage`/`sessionStorage` hanya boleh diakses dalam `useEffect` untuk mencegah hydration mismatch

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3", "3.4"] },
    { "id": 3, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 4, "tasks": ["5.1", "5.2"] },
    { "id": 5, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3"] },
    { "id": 7, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5"] },
    { "id": 8, "tasks": ["9.1", "9.2", "10.1"] },
    { "id": 9, "tasks": ["9.3", "10.2", "11.1", "12.1"] },
    { "id": 10, "tasks": ["11.2", "12.2"] },
    { "id": 11, "tasks": ["11.3", "12.3"] },
    { "id": 12, "tasks": ["11.4", "12.4", "14.1"] },
    { "id": 13, "tasks": ["12.5", "14.2", "15.1"] },
    { "id": 14, "tasks": ["14.3", "15.2", "16.1"] },
    { "id": 15, "tasks": ["15.3", "16.2", "17.1"] },
    { "id": 16, "tasks": ["16.3", "17.2", "17.3"] },
    { "id": 17, "tasks": ["17.4", "19.1", "19.2"] },
    { "id": 18, "tasks": ["20.1", "20.2"] },
    { "id": 19, "tasks": ["21.1", "21.2", "21.3", "21.4", "21.5", "21.6", "21.7", "21.8", "21.9", "21.10"] },
    { "id": 20, "tasks": ["22.1", "22.2", "22.3", "22.4"] },
    { "id": 21, "tasks": ["23.1", "23.2"] }
  ]
}
```
