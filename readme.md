# Aplikasi Biodata Modern (Node.js + MySQL)

Aplikasi web CRUD (POST & GET) sederhana untuk mengelola data biodata pribadi. Aplikasi ini dibangun dengan back-end Node.js (Express.js), database MySQL, dan front-end interaktif menggunakan HTML, CSS, dan JavaScript modern.

## Tampilan Aplikasi
<img width="2559" height="1599" alt="Screenshot aplikasi" src="https://github.com/user-attachments/assets/6c226620-e080-4ad8-8dce-9dbcbf999132" />


## Fitur
- **Tambah Data:** Menambahkan biodata baru melalui form, termasuk upload gambar.
- **Tampilkan Data:** Menampilkan semua data yang tersimpan dalam tabel yang dinamis.
- **Antarmuka Modern:** Desain UI yang bersih dan modern dengan efek "glassmorphism" dan animasi.
- **Responsif:** Tampilan yang dapat menyesuaikan diri dengan berbagai ukuran layar, dari desktop hingga mobile.
- **Notifikasi Real-time:** Memberikan umpan balik langsung kepada pengguna saat data berhasil disimpan atau gagal.
- **Image Preview:** Modal untuk melihat gambar dalam ukuran yang lebih besar.

## Teknologi yang Digunakan
- **Front-End:**
  - index.HTML
- **Back-End:**
  - Node.js
  - Express.js
- **Database:**
  - MySQL
- **Lainnya:**
  - Multer (untuk menangani file upload)

## Petunjuk Instalasi dan Menjalankan

### 1. Prasyarat
Pastikan Anda sudah menginstal perangkat lunak berikut:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- Server Database MySQL (misalnya menggunakan [XAMPP](https://www.apachefriends.org/index.html), [WAMP](https://www.wampserver.com/), atau instalasi MySQL langsung)

### 2. Persiapan Proyek
1.  **Clone atau Unduh Proyek:**
    Letakkan semua file proyek (`index.html`, `server.js`, dll.) dalam satu folder.

2.  **Buka Terminal:**
    Buka terminal atau command prompt di dalam direktori proyek tersebut.

3.  **Install Dependencies:**
    Jalankan perintah berikut untuk menginstal semua paket yang dibutuhkan oleh server:
    ```bash
    npm install
    ```

### 3. Setup Database
1.  Pastikan server MySQL Anda berjalan.
2.  Buat database baru dengan nama `biodata_db`.
3.  Jalankan query SQL berikut untuk membuat tabel `biodata`:
    ```sql
    CREATE TABLE biodata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        tinggi_badan INT NOT NULL,
        tanggal DATE NOT NULL,
        gambar VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### 4. Konfigurasi Koneksi
1.  Buka file `server.js`.
2.  Sesuaikan detail koneksi database pada bagian `db.createConnection` agar sesuai dengan konfigurasi MySQL Anda.
    ```javascript
    const db = mysql.createConnection({
      host: 'localhost',       // Sesuaikan jika perlu
      user: 'root',            // Ganti dengan username MySQL Anda
      password: '',            // Ganti dengan password MySQL Anda
      database: 'biodata_db'   // Nama database yang dibuat sebelumnya
    });
    ```

### 5. Menjalankan Server
Setelah semua konfigurasi selesai, jalankan server Node.js dengan perintah:
```bash
node server.js
```
Anda akan melihat pesan di terminal: `Server is running at http://localhost:3000`.

### 6. Buka Aplikasi
Buka browser Anda dan kunjungi alamat berikut:
[http://localhost:3000](http://localhost:3000)

Aplikasi biodata Anda kini siap digunakan!

## Struktur Folder Proyek
```
/biodata-app
|-- /uploads/           # Folder untuk menyimpan gambar yang di-upload
|-- index.html          # File antarmuka (front-end)
|-- server.js           # File logika server (back-end)
|-- package.json        # Informasi proyek dan dependencies
|-- package-lock.json
|-- README.md           # Dokumentasi ini
```
