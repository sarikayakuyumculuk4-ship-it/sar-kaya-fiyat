const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

async function getGoldPrice() {
    try {
        // En stabil veri kaynağına istek atıyoruz
        const { data } = await axios.get('https://kur.doviz.com/altin/gram-altin', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(data);
        
        // Fiyatın olduğu ana HTML elementini buluyoruz
        let price = $('span[data-socket-key="gram-altin"][data-socket-attr="s"]').text().trim();
        
        if (!price) {
            // Alternatif seçici (Eğer üstteki değişirse)
            price = $('.value').first().text().trim();
        }

        return price;
    } catch (error) {
        console.error("Veri çekme hatası:", error.message);
        return "---";
    }
}

app.get('/api/altin', async (req, res) => {
    const price = await getGoldPrice();
    res.json({ fiyat: price });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Sunucu Çalışıyor: http://localhost:${PORT}`);
    console.log(`📡 Veri adresi: http://localhost:${PORT}/api/altin\n`);
});
