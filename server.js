const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.static('public'));

// Senin verdiğin katsayılar
const katsayilar = {
    ceyrek: { alis: 1.62, satis: 1.64 },
    yarim: { alis: 3.24, satis: 3.27 },
    tam: { alis: 6.46, satis: 6.52 },
    ata: { alis: 6.68, satis: 6.715 },
    ayar22: { alis: 0.913, satis: 0.930 }
};

app.get('/api/fiyatlar', async (req, res) => {
    try {
        // Ücretsiz ve direkt erişilebilir has altın fiyatı (Genelde 24 Ayar baz alınır)
        const goldApi = await axios.get('https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa');
        
        // Gelen veriden "Altın (Gram)" değerini buluyoruz
        const altinVerisi = goldApi.data.Data.find(x => x.SEMBOL == "GA");
        const hasAltin = parseFloat(altinVerisi.SATIS.replace(',', '.'));

        const hesaplananFiyatlar = {
            hasAltin: hasAltin,
            ceyrek: { 
                alis: Math.floor(hasAltin * katsayilar.ceyrek.alis), 
                satis: Math.ceil(hasAltin * katsayilar.ceyrek.satis) 
            },
            yarim: { 
                alis: Math.floor(hasAltin * katsayilar.yarim.alis), 
                satis: Math.ceil(hasAltin * katsayilar.yarim.satis) 
            },
            tam: { 
                alis: Math.floor(hasAltin * katsayilar.tam.alis), 
                satis: Math.ceil(hasAltin * katsayilar.tam.satis) 
            },
            ata: { 
                alis: Math.floor(hasAltin * katsayilar.ata.alis), 
                satis: Math.ceil(hasAltin * katsayilar.ata.satis) 
            },
            ayar22: { 
                alis: (hasAltin * katsayilar.ayar22.alis).toFixed(2), 
                satis: (hasAltin * katsayilar.ayar22.satis).toFixed(2) 
            }
        };

        res.json(hesaplananFiyatlar);
    } catch (error) {
        console.error("Fiyat çekme hatası:", error);
        res.status(500).json({ error: "Fiyatlar şu an alınamıyor." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Site http://localhost:${PORT} adresinde yayında`));
