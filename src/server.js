const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/evaluations', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'evaluations.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read evaluations' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/evaluations', (req, res) => {
    const newEvaluation = req.body;

    fs.readFile(path.join(__dirname, 'data', 'evaluations.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read evaluations' });
        }

        let dataObj = JSON.parse(data);
        let evaluations;
        if (Array.isArray(dataObj)) {
            evaluations = dataObj;
        } else if (Array.isArray(dataObj.evaluations)) {
            evaluations = dataObj.evaluations;
        } else {
            evaluations = [];
        }
        evaluations.push(newEvaluation);

        // Salva no mesmo formato do arquivo original
        let toSave = Array.isArray(dataObj) ? evaluations : { evaluations };

        fs.writeFile(path.join(__dirname, 'data', 'evaluations.json'), JSON.stringify(toSave, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save evaluation' });
            }
            res.status(201).json(newEvaluation);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});