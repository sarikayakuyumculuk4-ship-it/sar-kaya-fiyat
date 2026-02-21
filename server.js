const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const katsayilar = {
    ceyrek: { alis: 1.62, satis: 1.64 },
    yarim: { alis: 3.24, satis: 3.27 },
    tam: { alis: 6.46, satis: 6.52 },
    ata: { alis: 6.68, satis: 6.715 },
    ayar22: { alis: 0.913, satis: 0.930 }
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/fiyatlar', async (req, res) => {
    try {
        // Döviz.com'un ham verisinden has altını çekiyoruz (Hızlı ve Key gerektirmez)
        const response = await axios.get('https://finans.truncgil.com/today.json');
        
        // JSON içinden "Gram Altın" verisini buluyoruz
        const hasVerisi = response.data["Gram Altın"];
        if (!hasVerisi) throw new Error("Veri formatı uyuşmuyor");

        const hasAltin = parseFloat(hasVerisi.Alış.replace('.', '').replace(',', '.'));

        const hesaplanan = {
            hasAltin: hasAltin,
            ceyrek: { alis: Math.floor(hasAltin * katsayilar.ceyrek.alis), satis: Math.ceil(hasAltin * katsayilar.ceyrek.satis) },
            yarim: { alis: Math.floor(hasAltin * katsayilar.yarim.alis), satis: Math.ceil(hasAltin * katsayilar.yarim.satis) },
            tam: { alis: Math.floor(hasAltin * katsayilar.tam.alis), satis: Math.ceil(hasAltin * katsayilar.tam.satis) },
            ata: { alis: Math.floor(hasAltin * katsayilar.ata.alis), satis: Math.ceil(hasAltin * katsayilar.ata.satis) },
            ayar22: { alis: (hasAltin * katsayilar.ayar22.alis).toFixed(2), satis: (hasAltin * katsayilar.ayar22.satis).toFixed(2) }
        };
        res.json(hesaplanan);
    } catch (error) {
        console.error("HATA DETAYI:", error.message);
        res.status(500).json({ error: "Fiyatlar şu an alınamıyor: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server çalışıyor: ${PORT}`));
