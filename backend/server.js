const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configurazione database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connessione al database
pool.connect((err, client, release) => {
  if (err) {
    console.error('Errore connessione al database', err.stack);
  } else {
    console.log('Connesso al database PostgreSQL');
    release();
  }
});

// ========================
// API: Incarichi
// ========================

// GET /api/incarichi
app.get('/api/incarichi', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM incarichi ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Errore nel recuperare gli incarichi' });
  }
});

// POST /api/incarichi
app.post('/api/incarichi', async (req, res) => {
  const { client_name, flight, arrival_time, hotel, hotel_address, operator_id, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO incarichi (client_name, flight, arrival_time, hotel, hotel_address, operator_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [client_name, flight, arrival_time, hotel, hotel_address, operator_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Errore nel creare l\'incarico' });
  }
});

// ========================
// API: Utenti
// ========================

// POST /api/users - Crea un nuovo utente (amministratore o collaboratore)
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validazione
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
    }

    // Hash della password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserisci nel database
    const result = await pool.query(
      `INSERT INTO users (username, password, role)
       VALUES ($1, $2, $3) RETURNING id, username, role`,
      [email, hashedPassword, role.toUpperCase()]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Errore nella creazione utente:', err);
    res.status(500).json({ message: 'Errore nel creare l\'utente' });
  }
});

// ========================
// API: Login
// ========================

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    // Genera token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secret-key',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Errore nel login' });
  }
});

// ========================
// Avvio server
// ========================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

module.exports = app;
