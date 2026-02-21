import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get("/api/harem", async (req, res) => {
  try {
    const response = await fetch("https://www.haremaltin.com");
    const html = await response.text();

    const $ = cheerio.load(html);

    // SAYFADAKİ GRAM ALTIN SATIRINI BUL
    const gramSatir = $("td:contains('Gram Altın')").parent();

    const gramAlis = gramSatir.find("td").eq(1).text().trim();
    const gramSatis = gramSatir.find("td").eq(2).text().trim();

    res.json({
      gramAltin: {
        alis: gramAlis,
        satis: gramSatis
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Harem verisi alınamadı" });
  }
});

app.listen(PORT, () => {
  console.log("Sunucu çalışıyor");
});
