# Requirements Document

## Introduction

Selaras adalah platform web inklusif berbasis AI yang menghubungkan guru, siswa tunarungu/gangguan pendengaran, dan teman sekelas dalam lingkungan belajar yang setara. Platform ini menyediakan dua mode komunikasi utama — Scanner (terjemahan bahasa isyarat real-time via kamera) dan Avatar (konversi teks/suara guru menjadi avatar digital) — dipadu dengan sistem gamifikasi berupa poin, badge, dan streak harian. Seluruh aplikasi dibangun menggunakan Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, dan data mock (tanpa backend nyata).

---

## Glossary

- **Selaras**: Nama aplikasi; platform komunikasi inklusif untuk pendidikan.
- **BISINDO**: Bahasa Isyarat Indonesia — sistem bahasa isyarat yang digunakan di Indonesia.
- **Scanner**: Mode fitur yang mendeteksi gerakan bahasa isyarat melalui kamera perangkat dan menghasilkan teks terjemahan.
- **Avatar**: Mode fitur yang mengkonversi teks atau suara guru menjadi animasi avatar digital yang memperagakan bahasa isyarat.
- **Hasil_Terjemahan**: Layar yang menampilkan teks hasil terjemahan beserta animasi isyarat dan opsi aksi.
- **Riwayat**: Layar yang menampilkan daftar sesi komunikasi yang telah tersimpan.
- **Poin**: Unit reward numerik yang diperoleh pengguna setelah menyelesaikan sesi komunikasi.
- **Badge**: Penghargaan visual yang diraih pengguna berdasarkan pencapaian tertentu.
- **Streak**: Hitungan hari berturut-turut pengguna aktif menggunakan aplikasi.
- **XP**: Experience Points; poin kemajuan yang mengisi progress bar menuju level berikutnya.
- **Bottom_Navigation**: Komponen navigasi bawah layar dengan empat tab: Beranda, Riwayat, Poin, Profil.
- **App_Router**: Sistem routing Next.js 15 berbasis direktori `src/app/`.
- **Mock_Data**: Data statis yang mensimulasikan respons backend; tidak ada koneksi ke server nyata.
- **Framer_Motion**: Library animasi React yang digunakan untuk transisi dan efek UI.
- **Tailwind_CSS**: Framework utility-first CSS; satu-satunya metode styling yang diperbolehkan.
- **shadcn_ui**: Koleksi komponen UI berbasis Radix UI dan Tailwind CSS.
- **Server_Component**: Komponen React yang dirender di server secara default di Next.js App Router.
- **Client_Component**: Komponen React dengan direktif `"use client"` yang dirender di browser.
- **Guest_Mode**: Mode tamu yang memungkinkan akses aplikasi tanpa akun terdaftar.
- **Tamu**: Pengguna yang mengakses aplikasi dalam Guest_Mode.
- **Siswa**: Pengguna dengan peran pelajar; penerima utama terjemahan bahasa isyarat.
- **Guru**: Pengguna dengan peran pengajar; menggunakan mode Avatar untuk berkomunikasi.

---

## Requirements

### Requirement 1: Halaman Login dan Splash Screen

**User Story:** Sebagai pengguna baru maupun terdaftar, saya ingin melihat halaman login yang menarik dengan identitas brand Selaras, sehingga saya dapat masuk, mendaftar, atau melanjutkan sebagai tamu.

#### Acceptance Criteria

1. THE Selaras_App SHALL menampilkan logo Selaras beserta tagline "Koneksi, Harmoni, Komunikasi" pada halaman login.
2. THE Selaras_App SHALL menampilkan ilustrasi guru dan siswa pada halaman login.
3. THE Selaras_App SHALL menyediakan tombol "Masuk" yang mengarahkan ke alur autentikasi.
4. THE Selaras_App SHALL menyediakan tombol "Daftar" yang mengarahkan ke alur pendaftaran.
5. THE Selaras_App SHALL menyediakan tautan teks "Masuk sebagai tamu" yang mengaktifkan Guest_Mode tanpa memerlukan akun.
6. WHEN pengguna memilih Guest_Mode, THE Selaras_App SHALL langsung mengarahkan ke halaman Pilih Mode Fitur tanpa memerlukan kredensial.
7. IF formulir login disubmit dengan satu atau lebih field wajib kosong, THEN THE Selaras_App SHALL menampilkan pesan validasi inline di bawah setiap field yang kosong tanpa mereset nilai field lain yang telah diisi.
8. IF formulir login disubmit dengan kredensial yang tidak valid, THEN THE Selaras_App SHALL menampilkan pesan kesalahan inline yang menginformasikan kegagalan autentikasi tanpa mereset field yang telah diisi.
9. THE Selaras_App SHALL menerapkan tipografi Poppins dan elemen brand sesuai panduan desain Selaras pada seluruh elemen halaman login.

---

### Requirement 2: Halaman Pilih Mode Fitur

**User Story:** Sebagai siswa atau guru yang telah login, saya ingin memilih mode komunikasi yang sesuai, sehingga saya dapat memulai sesi Scanner atau Avatar sesuai kebutuhan.

#### Acceptance Criteria

1. THE Selaras_App SHALL menampilkan heading "Pilih cara kamu berkomunikasi" pada halaman Pilih Mode Fitur.
2. THE Selaras_App SHALL menampilkan dua kartu mode: kartu Scanner dengan ikon tangan dan deskripsi "Terjemahkan gerakan isyarat menggunakan kamera", dan kartu Avatar dengan ikon avatar dan deskripsi "Gunakan avatar digital dari teks atau suara guru".
3. WHEN pengguna memilih kartu Scanner, THE Selaras_App SHALL menavigasi ke halaman Mode Scanner dalam waktu ≤ 2 detik.
4. WHEN pengguna memilih kartu Avatar, THE Selaras_App SHALL menavigasi ke halaman Mode Avatar dalam waktu ≤ 2 detik.
5. THE Bottom_Navigation SHALL ditampilkan pada halaman Pilih Mode Fitur dengan empat tab: Beranda, Riwayat, Poin, dan Profil.
6. WHEN pengguna mengetuk tab Bottom_Navigation, THE Selaras_App SHALL menavigasi ke halaman yang sesuai dengan tab yang dipilih dalam waktu ≤ 2 detik.
7. THE Selaras_App SHALL menandai tab "Beranda" sebagai aktif saat halaman Pilih Mode Fitur ditampilkan.
8. IF pengguna mengakses halaman Pilih Mode Fitur tanpa autentikasi aktif atau Guest_Mode, THEN THE Selaras_App SHALL mengalihkan pengguna ke halaman login.

---

### Requirement 3: Mode Scanner (AI Scanner)

**User Story:** Sebagai siswa tunarungu, saya ingin mengarahkan kamera ke tangan saya saat melakukan bahasa isyarat, sehingga aplikasi dapat mengenali dan menerjemahkan gerakan saya secara real-time.

#### Acceptance Criteria

1. THE Scanner_Mode SHALL menampilkan tampilan kamera live dengan badge "LIVE" yang terlihat jelas di sudut tampilan kamera.
2. THE Scanner_Mode SHALL menampilkan overlay teal sebagai indikator area deteksi gerakan.
3. WHILE sesi deteksi aktif, THE Scanner_Mode SHALL menampilkan status bar "Mendeteksi gerakan..." beserta animasi audio waveform.
4. WHEN gerakan isyarat terdeteksi (disimulasikan dengan Mock_Data), THE Scanner_Mode SHALL menampilkan indikator proses "Memproses gerakan..." selama minimal 500ms sebelum menampilkan hasil.
5. WHEN pemrosesan selesai, THE Selaras_App SHALL menavigasi ke halaman Hasil_Terjemahan dalam waktu ≤ 3 detik dengan data terjemahan yang sesuai.
6. THE Scanner_Mode SHALL menggunakan Client_Component karena memerlukan akses ke API kamera browser.
7. IF akses kamera tidak tersedia atau ditolak, THEN THE Scanner_Mode SHALL menampilkan pesan error yang menjelaskan alasan kegagalan beserta tombol "Coba Lagi" yang memicu permintaan izin kamera baru.
8. THE Bottom_Navigation SHALL ditampilkan pada halaman Mode Scanner.
9. IF pengguna menekan tombol "Coba Lagi" dan kamera masih tidak dapat diakses, THEN THE Scanner_Mode SHALL menampilkan pesan error persisten tanpa menyebabkan crash atau navigasi yang tidak diinginkan.

---

### Requirement 4: Halaman Hasil Terjemahan

**User Story:** Sebagai siswa, saya ingin melihat teks hasil terjemahan bahasa isyarat saya beserta animasi isyarat referensi, sehingga saya dapat memahami dan mengkonfirmasi komunikasi yang terjadi.

#### Acceptance Criteria

1. THE Hasil_Terjemahan SHALL menampilkan teks hasil terjemahan dengan ukuran font minimum 24sp dan panjang maksimal 200 karakter yang mudah dibaca.
2. THE Hasil_Terjemahan SHALL menampilkan ikon audio dengan ukuran touch target minimum 44x44dp di samping teks terjemahan sebagai indikasi kemampuan text-to-speech.
3. THE Hasil_Terjemahan SHALL menampilkan seksi "Animasi Isyarat" yang memperlihatkan avatar memperagakan tanda isyarat dengan durasi animasi antara 1–10 detik.
4. WHEN pengguna mengetuk tombol "Salin Teks", THE Hasil_Terjemahan SHALL menyalin teks terjemahan ke clipboard perangkat.
5. WHEN pengguna mengetuk tombol "Salin Teks", THE Hasil_Terjemahan SHALL menampilkan konfirmasi visual bahwa teks telah disalin.
6. WHEN pengguna mengetuk tombol "Dengarkan", THE Hasil_Terjemahan SHALL memulai simulasi text-to-speech dalam waktu ≤ 3 detik.
7. IF Mock_Data text-to-speech tidak tersedia, THEN THE Hasil_Terjemahan SHALL menampilkan pesan error yang informatif tanpa menutup halaman.
8. WHEN sesi terjemahan selesai, THE Selaras_App SHALL menavigasi ke halaman Reward_Screen dan menambahkan entri ke Riwayat yang berisi teks terjemahan dan waktu sesi.
9. THE Bottom_Navigation SHALL ditampilkan pada halaman Hasil_Terjemahan.

---

### Requirement 5: Layar Reward dan Poin

**User Story:** Sebagai siswa, saya ingin mendapat umpan balik positif berupa poin dan badge setelah menyelesaikan sesi komunikasi, sehingga saya termotivasi untuk terus berlatih.

#### Acceptance Criteria

1. WHEN Reward_Screen pertama kali ditampilkan, THE Reward_Screen SHALL menampilkan pesan "Kamu mendapatkan poin".
2. THE Reward_Screen SHALL menampilkan ilustrasi medali/badge berwarna emas.
3. THE Reward_Screen SHALL menampilkan jumlah poin yang diperoleh dalam format "+ [N] Poin" di mana N adalah bilangan bulat antara 1–999.
4. THE Reward_Screen SHALL menampilkan subtitle motivasi "Kamu hebat! Terus berlatihlah".
5. THE Reward_Screen SHALL menampilkan progress bar XP dengan nilai XP saat ini (post-session) terhadap target level berikutnya.
6. WHEN pengguna menekan tombol "Lihat Badge", THE Selaras_App SHALL menavigasi ke halaman Profil pada seksi badge.
7. WHEN Reward_Screen pertama kali ditampilkan, THE Selaras_App SHALL memperbarui total Poin dan XP pengguna dalam Mock_Data.
8. IF pembaruan Mock_Data gagal, THEN THE Reward_Screen SHALL tetap menampilkan nilai poin sesi saat ini tanpa crash.
9. WHEN Reward_Screen muncul, THE Reward_Screen SHALL menampilkan animasi entrance (fade-in + scale-up) menggunakan Framer_Motion dengan durasi antara 300ms–1000ms.
10. THE Reward_Screen SHALL memastikan tombol "Lihat Badge" terlihat dan dapat ditekan setelah animasi entrance selesai.

---

### Requirement 6: Halaman Riwayat

**User Story:** Sebagai pengguna, saya ingin melihat riwayat sesi komunikasi saya yang tersimpan, sehingga saya dapat meninjau ulang, mencari, dan mengelola percakapan sebelumnya.

#### Acceptance Criteria

1. THE Riwayat_Screen SHALL menampilkan search bar dengan placeholder "Cari percakapan..." di bagian atas halaman.
2. THE Riwayat_Screen SHALL menampilkan tab filter: "Semua", "Scanner", dan "Avatar" dengan tab "Semua" aktif secara default saat halaman pertama kali dimuat.
3. WHEN pengguna memilih tab filter, THE Riwayat_Screen SHALL memfilter daftar riwayat sehingga hanya menampilkan item dengan label mode yang sesuai; tab "Semua" menampilkan seluruh item tanpa filter.
4. THE Riwayat_Screen SHALL menampilkan setiap item riwayat dengan: teks terjemahan (maksimal 100 karakter, diakhiri "..." jika melebihi batas), label mode ("Scanner" atau "Avatar"), timestamp dalam format DD/MM/YYYY HH:MM, tombol play, ikon bintang, dan menu overflow.
5. WHEN pengguna mengetik di search bar, THE Riwayat_Screen SHALL memfilter item riwayat dalam waktu kurang dari 300ms berdasarkan kecocokan teks input dengan teks terjemahan, tanpa memperhatikan kapitalisasi huruf.
6. WHEN daftar riwayat kosong setelah filter atau pencarian diterapkan, THE Riwayat_Screen SHALL menampilkan empty state dengan ilustrasi dan pesan yang menjelaskan alasan daftar kosong.
7. THE Bottom_Navigation SHALL ditampilkan pada halaman Riwayat dengan tab "Riwayat" ditandai sebagai aktif dan tab lainnya tidak aktif.
8. THE Riwayat_Screen SHALL menggunakan Mock_Data yang memuat minimal 3 item riwayat, mencakup setidaknya satu item berlabel "Scanner" dan satu item berlabel "Avatar".
9. WHEN pengguna mengetuk menu overflow pada sebuah item riwayat, THE Riwayat_Screen SHALL menampilkan opsi "Hapus" untuk menghapus item tersebut.
10. IF pengguna mengonfirmasi penghapusan item riwayat, THEN THE Riwayat_Screen SHALL menghapus item tersebut dari daftar dan memperbarui tampilan secara langsung tanpa memuat ulang halaman.

---

### Requirement 7: Halaman Profil dan Poin

**User Story:** Sebagai pengguna, saya ingin melihat profil saya beserta statistik poin, badge, dan streak, sehingga saya dapat memantau kemajuan belajar saya.

#### Acceptance Criteria

1. THE Profil_Screen SHALL menampilkan avatar pengguna, nama pengguna (maksimal 50 karakter), dan peran pengguna yang diambil dari Mock_Data.
2. THE Profil_Screen SHALL menampilkan ikon settings (gear) yang dapat diklik.
3. THE Profil_Screen SHALL menampilkan progress bar XP dengan nilai XP saat ini (antara 0 dan nilai target) terhadap target XP level berikutnya (nilai target > 0).
4. THE Profil_Screen SHALL menampilkan tiga kartu statistik: Total Poin (bilangan bulat ≥ 0), Badge (bilangan bulat ≥ 0), dan Streak (bilangan bulat ≥ 0 hari 🔥), semua diambil dari Mock_Data.
5. THE Profil_Screen SHALL menampilkan subtitle motivasi untuk streak, contoh: "Pertahankan streak-mu!".
6. THE Bottom_Navigation SHALL ditampilkan pada halaman Profil dengan tab "Profil" ditandai sebagai aktif dan tab lainnya tidak aktif.
7. WHEN halaman Profil dimuat, THE Profil_Screen SHALL menampilkan data pengguna dari Mock_Data dalam waktu ≤ 2 detik.
8. WHEN pengguna mengetuk ikon settings, THE Profil_Screen SHALL menampilkan panel atau halaman pengaturan dalam waktu ≤ 1 detik.
9. IF Mock_Data tidak tersedia saat halaman Profil dimuat, THEN THE Profil_Screen SHALL menampilkan pesan error yang informatif tanpa crash.

---

### Requirement 8: Bottom Navigation dan Routing

**User Story:** Sebagai pengguna yang telah login, saya ingin navigasi yang konsisten di bagian bawah layar di semua halaman aplikasi, sehingga saya dapat berpindah antar fitur dengan mudah.

#### Acceptance Criteria

1. THE Bottom_Navigation SHALL menampilkan empat tab dari kiri ke kanan secara berurutan: Beranda (ikon home), Riwayat (ikon clock/history), Poin (ikon gift), dan Profil (ikon user).
2. WHEN halaman aktif berubah, THE Bottom_Navigation SHALL menandai tepat satu tab sebagai aktif dan tiga tab lainnya sebagai tidak aktif sesuai halaman yang sedang ditampilkan.
3. THE Selaras_App SHALL menggunakan App_Router Next.js 15 dengan struktur direktori `src/app/` untuk semua route halaman.
4. THE Selaras_App SHALL mendefinisikan route untuk setiap halaman: `/` (login), `/home` (pilih mode), `/scanner`, `/avatar`, `/result`, `/reward`, `/history`, `/profile`.
5. WHEN pengguna mengakses route yang tidak terdefinisi, THE Selaras_App SHALL menampilkan halaman 404 yang menggunakan komponen dan skema warna Selaras serta menyertakan tautan kembali ke `/home`.
6. THE Bottom_Navigation SHALL tidak ditampilkan pada route `/` (login).
7. WHEN pengguna mengetuk tab Bottom_Navigation, THE Selaras_App SHALL menyelesaikan navigasi dalam waktu < 300ms.

---

### Requirement 9: Sistem Animasi dan Transisi

**User Story:** Sebagai pengguna, saya ingin merasakan transisi layar dan animasi UI yang halus, sehingga pengalaman menggunakan aplikasi terasa modern dan menyenangkan.

#### Acceptance Criteria

1. THE Selaras_App SHALL menggunakan Framer_Motion untuk semua animasi halaman dan transisi antar route.
2. WHILE sesi Scanner aktif, THE Scanner_Mode SHALL menampilkan animasi audio waveform berwarna teal yang bergerak secara looping dengan interval animasi antara 1–3 detik.
3. WHEN Reward_Screen muncul, THE Reward_Screen SHALL menampilkan animasi entrance dengan fade-in (opacity 0→1) dan scale-up (scale 0.8→1.0) untuk elemen medali dan teks reward dengan durasi antara 200–500ms.
4. WHEN konten sedang dimuat, THE Selaras_App SHALL menampilkan animasi loading (skeleton atau spinner) yang persisten hingga konten tersedia.
5. WHEN pengguna berpindah antar halaman melalui Bottom_Navigation, THE Selaras_App SHALL menampilkan animasi transisi halaman dengan durasi antara 150–400ms.
6. THE Selaras_App SHALL memastikan semua animasi menghasilkan Cumulative Layout Shift (CLS) ≤ 0.1.
7. IF pengguna mengaktifkan preferensi `prefers-reduced-motion`, THEN THE Selaras_App SHALL membatasi durasi semua animasi menjadi ≤ 50ms.

---

### Requirement 10: Responsivitas dan Aksesibilitas

**User Story:** Sebagai pengguna yang mengakses dari berbagai perangkat, saya ingin aplikasi tampil dengan baik di desktop, tablet, dan mobile, serta dapat digunakan dengan alat bantu aksesibilitas.

#### Acceptance Criteria

1. THE Selaras_App SHALL menerapkan layout responsif yang berfungsi pada lebar layar mobile (360px–767px), tablet (768px–1023px), dan desktop (1024px ke atas) menggunakan breakpoint Tailwind_CSS, sehingga tidak ada elemen yang terpotong, tumpang tindih, atau melampaui batas viewport secara horizontal pada ketiga rentang tersebut.
2. THE Selaras_App SHALL menyertakan atribut `alt` pada semua elemen gambar; gambar dekoratif menggunakan `alt=""` dan gambar konten menggunakan teks `alt` deskriptif maksimal 125 karakter.
3. THE Selaras_App SHALL menyertakan atribut `aria-label` pada semua tombol yang tidak memiliki teks label terlihat, di mana nilai `aria-label` mendeskripsikan aksi tombol dalam maksimal 60 karakter.
4. THE Selaras_App SHALL menggunakan elemen HTML semantik (`<nav>`, `<main>`, `<header>`, `<button>`, `<section>`) sehingga setiap halaman memiliki tepat satu `<main>`, tepat satu `<header>` level halaman, dan navigasi utama dibungkus dalam `<nav>`.
5. THE Selaras_App SHALL memastikan rasio kontras minimum 4.5:1 untuk teks di bawah 18pt (atau 14pt bold) dan rasio kontras minimum 3:1 untuk teks 18pt ke atas sesuai standar WCAG 2.1 Level AA.
6. THE Selaras_App SHALL memastikan semua elemen interaktif dapat difokus dengan Tab dan diaktifkan dengan Enter atau Space, serta menampilkan indikator fokus dengan rasio kontras minimum 3:1 terhadap latar belakang sekitarnya.
7. IF suatu komponen menggunakan CSS Modules atau inline style, THEN THE Selaras_App SHALL menolak komponen tersebut pada proses linting; seluruh styling HARUS menggunakan Tailwind_CSS utility classes.

---

### Requirement 11: Arsitektur Komponen dan Struktur Folder

**User Story:** Sebagai developer, saya ingin struktur kode yang terorganisir dengan baik dan konvensi yang konsisten, sehingga aplikasi mudah dikembangkan dan dipelihara.

#### Acceptance Criteria

1. THE Selaras_App SHALL mengorganisir kode sumber dalam folder: `src/app/`, `src/components/ui/`, `src/components/layout/`, `src/components/cards/`, `src/components/forms/`, `src/components/navigation/`, `src/features/`, `src/hooks/`, `src/lib/`, `src/services/`, `src/types/`, `src/constants/`, dan `public/`; setiap folder hanya berisi file sesuai kategorinya.
2. THE Selaras_App SHALL menggunakan Server_Component secara default; komponen tidak boleh menggunakan `"use client"` kecuali memenuhi kriteria 3.
3. THE Selaras_App SHALL menggunakan direktif `"use client"` hanya pada komponen yang menggunakan React hooks (`useState`, `useEffect`, `useRef`, dll.), browser API (kamera, clipboard, audio, localStorage), atau event handler yang tidak dapat dirender di server.
4. THE Selaras_App SHALL mendefinisikan semua tipe TypeScript pada direktori `src/types/`; pengecualian hanya untuk tipe lokal yang hanya digunakan dalam satu file.
5. THE Selaras_App SHALL mendefinisikan semua data statis hardcoded dan konstanta konfigurasi pada direktori `src/constants/` atau `src/lib/`.
6. THE Selaras_App SHALL memperluas komponen shadcn_ui melalui komposisi; file yang dihasilkan generator shadcn di `src/components/ui/` tidak boleh dimodifikasi langsung.
7. THE Selaras_App SHALL mengkonfigurasi Tailwind_CSS dengan token warna semantik untuk palet brand Selaras (primary, secondary, accent, background, foreground, dll.) yang memetakan ke nilai hex brand; komponen HARUS menggunakan nama token semantik, bukan nilai hex langsung.
8. IF komponen Client_Component mengakses `localStorage` atau `sessionStorage`, THEN THE Selaras_App SHALL memastikan akses tersebut hanya terjadi setelah komponen di-mount (dalam `useEffect`) untuk mencegah hydration mismatch.

---

### Requirement 12: Mode Avatar

**User Story:** Sebagai guru, saya ingin memasukkan teks atau suara, lalu melihat avatar digital memperagakan bahasa isyarat yang sesuai, sehingga saya dapat berkomunikasi secara inklusif dengan siswa tunarungu.

#### Acceptance Criteria

1. THE Avatar_Mode SHALL menyediakan area input teks dengan batas maksimal 500 karakter untuk guru memasukkan kalimat yang akan dikonversi ke bahasa isyarat.
2. THE Avatar_Mode SHALL menyediakan opsi input suara yang mensimulasikan speech-to-text menggunakan Mock_Data, dan hasil simulasi harus mengisi area input teks.
3. WHEN guru mensubmit teks valid (1–500 karakter), THE Avatar_Mode SHALL menampilkan avatar digital yang memperagakan animasi bahasa isyarat dalam waktu ≤ 3 detik.
4. IF guru mensubmit teks kosong atau melebihi 500 karakter, THEN THE Avatar_Mode SHALL menampilkan pesan error inline dan tidak memulai animasi avatar.
5. WHEN pemrosesan input sedang berlangsung, THE Avatar_Mode SHALL menampilkan loading state "Memproses..." dan menonaktifkan tombol submit hingga animasi siap ditampilkan.
6. THE Avatar_Mode SHALL menggunakan animasi Framer_Motion untuk memperagakan gerakan avatar, di mana setiap kata atau frasa kunci memetakan ke setidaknya satu sekuens animasi yang berbeda.
7. THE Bottom_Navigation SHALL ditampilkan pada halaman Mode Avatar.
8. THE Avatar_Mode SHALL menggunakan Client_Component karena memerlukan state management untuk input dan animasi.
