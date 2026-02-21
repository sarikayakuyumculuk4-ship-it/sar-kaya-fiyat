import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Sarikaya Altın Backend Çalışıyor");
});

app.get("/altin", async (req, res) => {
  try {
    const response = await fetch("https://www.haremaltin.com/");
    const html = await response.text();
    const $ = cheerio.load(html);

    // ŞİMDİLİK SABİT TEST DEĞERİ (Sonra gerçek çekme yapacağız)
    const hasAlis = 7424;
    const hasSatis = 7462;

    // KATSAYILAR
    const ceyrekAlis = hasAlis * 1.62;
    const ceyrekSatis = hasSatis * 1.64;

    const yarimAlis = hasAlis * 3.24;
    const yarimSatis = hasSatis * 3.27;

    const tamAlis = hasAlis * 6.46;
    const tamSatis = hasSatis * 6.52;

    const ataAlis = hasAlis * 6.68;
    const ataSatis = hasSatis * 6.71;

    const ayar22Alis = hasAlis * 0.913;
    const ayar22Satis = hasSatis * 0.930;

    res.json({
      hasAlis,
      hasSatis,
      ceyrekAlis,
      ceyrekSatis,
      yarimAlis,
      yarimSatis,
      tamAlis,
      tamSatis,
      ataAlis,
      ataSatis,
      ayar22Alis,
      ayar22Satis
    });

  } catch (error) {
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

app.listen(PORT, () => {
  console.log("Sunucu çalışıyor");
});
