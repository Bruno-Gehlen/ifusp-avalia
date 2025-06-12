const express = require('express');
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Substitua pelas suas chaves do Supabase:
const SUPABASE_URL = process.env.SUPABASE_URL || 'SUA_SUPABASE_URL_AQUI';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'SUA_SUPABASE_ANON_KEY_AQUI';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/evaluations', async (req, res) => {
    const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        return res.status(500).json({ error: 'Failed to fetch evaluations', details: error.message });
    }
    res.json({ evaluations: data });
});

app.post('/api/evaluations', async (req, res) => {
    const { professor, subject, rating, comments } = req.body;
    const { data, error } = await supabase
        .from('evaluations')
        .insert([{ professor, subject, rating, comments }])
        .select();
    if (error) {
        return res.status(500).json({ error: 'Failed to save evaluation', details: error.message });
    }
    res.status(201).json(data[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});