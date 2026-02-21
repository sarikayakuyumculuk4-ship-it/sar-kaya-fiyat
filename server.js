const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.use(express.static('public'));

// Katsayıların
const katsayilar = {
    ceyrek: { alis: 1.62, satis: 1.64 },
    yarim: { alis: 3.24, satis: 3.27 },
    tam: { alis: 6.46, satis: 6.52 },
    ata: { alis: 6.68, satis: 6.715 },
    ayar22: { alis: 0.913, satis: 0.930 }
};

app.get('/api/fiyatlar', async (req, res) => {
    try {
        // Has Altın fiyatını alıyoruz (Örnek API kullanımı)
        // Not: Gerçek Harem Altın API anahtarın varsa URL'yi güncelleyebilirsin
        const response = await axios.get('https://api.collectapi.com/economy/goldPrice', {
            headers: { 'authorization': 'apikey YOUR_API_KEY_HERE' } // Buraya kendi API key'ini almalısın
        });
        
        // Eğer API yoksa simülasyon için baz fiyat (Örn: 2500 TL)
        const hasAltin = response.data.result ? parseFloat(response.data.result[0].buying) : 2500;

        const hesaplananFiyatlar = {
            hasAltin: hasAltin,
            ceyrek: { 
                alis: (hasAltin * katsayilar.ceyrek.alis).toFixed(2), 
                satis: (hasAltin * katsayilar.ceyrek.satis).toFixed(2) 
            },
            yarim: { 
                alis: (hasAltin * katsayilar.yarim.alis).toFixed(2), 
                satis: (hasAltin * katsayilar.yarim.satis).toFixed(2) 
            },
            tam: { 
                alis: (hasAltin * katsayilar.tam.alis).toFixed(2), 
                satis: (hasAltin * katsayilar.tam.satis).toFixed(2) 
            },
            ata: { 
                alis: (hasAltin * katsayilar.ata.alis).toFixed(2), 
                satis: (hasAltin * katsayilar.ata.satis).toFixed(2) 
            },
            ayar22: { 
                alis: (hasAltin * katsayilar.ayar22.alis).toFixed(2), 
                satis: (hasAltin * katsayilar.ayar22.satis).toFixed(2) 
            }
        };

        res.json(hesaplananFiyatlar);
    } catch (error) {
        res.status(500).json({ error: "Veri çekilemedi" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} üzerinde çalışıyor`));
