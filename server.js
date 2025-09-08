const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Pastikan folder uploads ada
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Folder uploads/ dibuat.');
}

// Pool MySQL
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',        // ganti sesuai password MySQL kamu
  database: 'biodata_db',  // pastikan database ini sudah ada
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi
pool.getConnection((err, conn) => {
  if (err) {
    console.error('DB connection failed:', err.code || err.message);
  } else {
    console.log('Connected to MySQL database.');
    conn.release();
  }
});

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// === ROUTES ===

// Root -> arahkan ke index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET semua biodata
app.get('/api/biodata', async (req, res) => {
  try {
    const [rows] = await pool.promise().query(
      "SELECT id, nama, tinggi_badan, DATE_FORMAT(tanggal, '%Y-%m-%d') AS tanggal, gambar, created_at FROM biodata ORDER BY created_at DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error('Error fetching biodata:', err.code, err.sqlMessage || err.message);
    if (err.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({ error: 'Table "biodata" tidak ditemukan. Jalankan SQL CREATE TABLE.' });
    }
    if (err.code === 'ER_BAD_DB_ERROR') {
      return res.status(500).json({ error: 'Database tidak ditemukan. Pastikan nama database benar.' });
    }
    return res.status(500).json({ error: 'Error fetching biodata', details: err.message });
  }
});

// POST tambah biodata
app.post('/api/biodata', upload.single('gambar'), async (req, res) => {
  try {
    const { nama, tinggi_badan, tanggal } = req.body;
    if (!nama || !tinggi_badan || !tanggal) {
      return res.status(400).json({ error: 'nama, tinggi_badan, dan tanggal wajib diisi.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Gambar wajib di-upload.' });
    }
    const gambarPath = req.file.filename;
    const [result] = await pool.promise().execute(
      'INSERT INTO biodata (nama, tinggi_badan, tanggal, gambar) VALUES (?, ?, ?, ?)',
      [nama, parseInt(tinggi_badan, 10), tanggal, gambarPath]
    );
    return res.status(201).json({ message: 'Data berhasil disimpan', id: result.insertId });
  } catch (err) {
    console.error('Error inserting biodata:', err.code, err.sqlMessage || err.message);
    return res.status(500).json({ error: 'Error inserting biodata', details: err.message });
  }
});

// Jalankan server
app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));
