import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

// TEST
app.get("/", (req, res) => {
  res.send("Backend çalışıyor");
});

app.get("/api/harem", async (req, res) => {
  try {
    const response = await fetch("https://www.haremaltin.com");
    const html = await response.text();
    const $ = cheerio.load(html);

    const gramSatir = $("td:contains('Gram Altın')").parent();
    const gramAlis = gramSatir.find("td").eq(1).text().trim();
    const gramSatis = gramSatir.find("td").eq(2).text().trim();

    res.json({
      gramAltin: {
        alis: gramAlis || "bulunamadı",
        satis: gramSatis || "bulunamadı"
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
