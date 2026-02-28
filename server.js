const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));

let lastFetchedPrice = "0";

async function getGoldPrice() {
    try {
        // Somaltin.com'a istek atıyoruz
        const { data } = await axios.get('http://somaltin.com/', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);
        
        // Sitedeki 2. satır, 4. sütun genellikle "Has Altın Satış" fiyatıdır
        let price = $('.fiyatlar table tr').eq(1).find('td').eq(3).text().trim();
        
        if (price) {
            lastFetchedPrice = price;
            return price;
        }
        return lastFetchedPrice;
    } catch (error) {
        console.error("Veri çekme hatası:", error.message);
        return lastFetchedPrice;
    }
}

// Frontend'in veri alacağı uç nokta
app.get('/api/price', async (req, res) => {
    const currentPrice = await getGoldPrice();
    res.json({ price: currentPrice });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
