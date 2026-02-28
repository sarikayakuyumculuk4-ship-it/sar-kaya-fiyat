const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('./')); // HTML dosyanla aynı klasörde çalışır

async function getGoldPrice() {
    try {
        const { data } = await axios.get('http://somaltin.com/', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(data);
        let goldPrice = "---";

        // Tablodaki tüm satırları döngüye alıyoruz
        $('table tr').each((index, element) => {
            const rowText = $(element).text().toLowerCase();
            // Satırda "has altın" veya "has altin" geçiyor mu?
            if (rowText.includes('has alt')) {
                // Bu satırdaki 4. sütunu (Satış) al
                goldPrice = $(element).find('td').eq(3).text().trim();
            }
        });

        return goldPrice;
    } catch (error) {
        console.error("Veri çekme hatası:", error.message);
        return "Hata";
    }
}

app.get('/api/price', async (req, res) => {
    const price = await getGoldPrice();
    res.json({ price });
});

app.listen(3000, () => {
    console.log('Sunucu http://localhost:3000 adresinde ayağa kalktı!');
});
