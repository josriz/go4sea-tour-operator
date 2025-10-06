const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Usa la porta assegnata da Render (10000 di default)
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/go4sea_db',
  ssl: false
});

// Test connessione database
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Errore connessione DB:', err.stack);
  } else {
    console.log('Connesso a PostgreSQL:', res.rows[0].now);
  }
});

// === Health Check per Render (obbligatorio) ===
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend Go4Sea attivo' });
});

// === Test API ===
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend Go4Sea attivo!' });
});

// === API INCARICHI ===

// GET: Tutti gli incarichi
app.get('/api/incarichi', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM incarichi ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// GET: Singolo incarico
app.get('/api/incarichi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM incarichi WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Incarico non trovato' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// POST: Nuovo incarico
app.post('/api/incarichi', async (req, res) => {
  try {
    const { client_name, flight, arrival_time, hotel, hotel_address, operator_id } = req.body;

    const result = await pool.query(
      `INSERT INTO incarichi 
      (client_name, flight, arrival_time, hotel, hotel_address, operator_id, status) 
      VALUES ($1, $2, $3, $4, $5, $6, 'assigned') 
      RETURNING *`,
      [client_name, flight, arrival_time, hotel, hotel_address, operator_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore salvataggio incarico' });
  }
});

// PUT: Aggiorna stato incarico
app.put('/api/incarichi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      'UPDATE incarichi SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Incarico non trovato' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore aggiornamento' });
  }
});

// === API OPERATORI ===
app.get('/api/operatori', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM operatori ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
});

// === Avvio server ===
// Render richiede: ascoltare su 0.0.0.0 e sulla porta corretta
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend Go4Sea in ascolto su http://0.0.0.0:${port}`);
});

module.exports = app;
