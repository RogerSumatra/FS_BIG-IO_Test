const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json([{ id: 1, title: 'Dah connect ke FE cuy'}]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
