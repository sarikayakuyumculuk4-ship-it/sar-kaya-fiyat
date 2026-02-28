const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

let lastPrices = {}; // Değişimi kontrol etmek için eski fiyatları tutuyoruz

async function getGoldPrices() {
    try {
        const { data } = await axios.get('http://somaltin.com/');
        const $ = cheerio.load(data);
        let prices = {};

        // Somaltin.com'daki tablo yapısına göre seçicileri (selector) buraya ekliyoruz
        // Örnek: $('.price-row').each(...) 
        // Not: Sitenin HTML yapısı değişkendir, CSS selector'ları kontrol edilmelidir.
        
        return prices;
    } catch (error) {
        console.error("Veri çekme hatası:", error);
    }
}

app.get('/api/prices', async (req, res) => {
    const prices = await getGoldPrices();
    res.json(prices);
});
