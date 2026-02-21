import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

// SENİN KATSAYILARIN
const katsayilar = {
  has: 0.995,
  ceyrek: 1.754,
  yarim: 3.508,
  cumhuriyet: 7.016,
  ata: 7.216
};

app.get("/api/fiyatlar", async (req, res) => {
  try {

    // ALTIN VERİSİ
    const altinRes = await fetch("https://api.genelpara.com/embed/altin.json");
    const altin = await altinRes.json();
    const gram = parseFloat(altin.GRAM.Alış.replace(",", "."));

    // DÖVİZ VERİSİ
    const dovizRes = await fetch("https://api.genelpara.com/embed/doviz.json");
    const doviz = await dovizRes.json();

    const hesapla = (k) => {
      const alis = gram * k;
      return {
        alis: alis.toFixed(2),
        satis: (alis + 50).toFixed(2)
      };
    };

    res.json({
      gram: {
        alis: gram.toFixed(2),
        satis: (gram + 50).toFixed(2)
      },
      hasAltin: hesapla(katsayilar.has),
      ceyrek: hesapla(katsayilar.ceyrek),
      yarim: hesapla(katsayilar.yarim),
      cumhuriyet: hesapla(katsayilar.cumhuriyet),
      ata: hesapla(katsayilar.ata),
      doviz: {
        USD: doviz.USD.satis,
        EUR: doviz.EUR.satis,
        GBP: doviz.GBP.satis,
        CHF: doviz.CHF.satis
      }
    });

  } catch (err) {
    console.error("HATA:", err);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

app.listen(PORT, () => {
  console.log("Sunucu çalışıyor");
});
