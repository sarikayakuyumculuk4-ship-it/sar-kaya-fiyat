import express from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get("/api/harem", async (req, res) => {
  try {
    const response = await fetch("https://haremaltin.com/fiyatlar");
    const html = await response.text();

    const $ = cheerio.load(html);

    // Bunlar örnek selector'lar
    // Site yapısı değişirse bunlar da değişir!
    const gramAlis = $("td:contains('Gram Altın')").next().text().trim();
    const gramSatis = $("td:contains('Gram Altın')").next().next().text().trim();

    res.json({
      gramAltin: {
        alis: gramAlis,
        satis: gramSatis
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Harem Altın verisi çekilemedi" });
  }
});

app.listen(PORT, () => console.log("Sunucu çalışıyor"));
