// server.js
const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

const modLinks = {
    'sildurs': 'https://www.curseforge.com/minecraft/shaders/sildurs-vibrant-shaders'
    // Добавьте другие моды здесь
};

const links = {}; // Хранилище для уникальных ссылок

// Генерация уникальной ссылки
app.get('/generate-link/:mod', (req, res) => {
    const modId = req.params.mod;
    const modLink = modLinks[modId];
    if (!modLink) {
        return res.status(404).send('Мод не найден');
    }
    
    const uniqueId = crypto.randomBytes(16).toString('hex');
    links[uniqueId] = modLink; // Сохранение ссылки
    res.send({ link: `https://yourserver.com/redirect/${uniqueId}` });
});

// Переход по уникальной ссылке
app.get('/redirect/:id', (req, res) => {
    const id = req.params.id;
    const link = links[id];
    if (link) {
        res.send(`<html><body><p>Перейдите по <a href="${link}">этой ссылке</a> для скачивания мода.</p></body></html>`);
    } else {
        res.status(404).send('Ссылка не найдена');
    }
});

// Скачивание мода
app.get('/download/:id', (req, res) => {
    const id = req.params.id;
    const link = links[id];
    if (link) {
        // Можно добавить логику для учета переходов здесь
        res.redirect(link); // Перенаправление на реальный мод
    } else {
        res.status(404).send('Ссылка не найдена');
    }
});

app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});
