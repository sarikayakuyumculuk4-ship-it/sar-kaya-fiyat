const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public')); // HTML dosyaların public klasöründeyse

// Somaltin.com'dan veri çekme fonksiyonu
async function fetchGoldData() {
    try {
        const { data } = await axios.get('http://somaltin.com/', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);
        
        // Site yapısına göre Has Altın (Gram) verisini çekiyoruz
        // Not: Selector site değiştikçe güncellenmelidir.
        const gramAlis = $('.box.fiyatlar table tr:nth-child(2) td:nth-child(3)').text().trim();
        const gramSatis = $('.box.fiyatlar table tr:nth-child(2) td:nth-child(4)').text().trim();

        return { gramAlis, gramSatis };
    } catch (error) {
        return { error: "Veri çekilemedi" };
    }
}

app.get('/api/altin', async (req, res) => {
    const prices = await fetchGoldData();
    res.json(prices);
});

app.listen(3000, () => console.log('Sunucu 3000 portunda aktif!'));
