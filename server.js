const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

// Som Altın'dan veriyi kazıyan ana fonksiyon
async function getPrice() {
    try {
        const response = await axios.get('http://somaltin.com/', {
            timeout: 5000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(response.data);
        
        // Sitedeki tabloyu tarayıp "Has Altın" satırını bulur
        let price = "";
        $('table tr').each((i, el) => {
            if ($(el).text().includes('Has Altın')) {
                price = $(el).find('td').eq(3).text().trim(); // 4. sütun Satış fiyatıdır
            }
        });
        return price || "Veri Alınamadı";
    } catch (err) {
        return "Bağlantı Hatası";
    }
}

app.get('/api/altin', async (req, res) => {
    const data = await getPrice();
    res.json({ fiyat: data });
});

app.listen(3000, () => console.log("Sunucu 3000 portunda hazır!"));
