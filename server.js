import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/fiyatlar", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.haremaltin.com/");
    const $ = cheerio.load(data);

    let hasAlis = 0;
    let hasSatis = 0;

    $("tr").each((i, el) => {
      const text = $(el).text();

      if (text.includes("HAS")) {
        const tds = $(el).find("td");
        hasAlis = parseFloat($(tds[1]).text().replace(",", "."));
        hasSatis = parseFloat($(tds[2]).text().replace(",", "."));
      }
    });

    res.json({ hasAlis, hasSatis });

  } catch (err) {
    res.status(500).json({ error: "Veri çekilemedi" });
  }
});

app.listen(3000, () => {
  console.log("Sunucu çalışıyor");
});
