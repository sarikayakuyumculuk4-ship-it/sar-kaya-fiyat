import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/altin", async (req, res) => {
  try {
    const response = await fetch("https://www.haremaltin.com/api/altin-fiyatlari");
    const data = await response.json();

    const has = data.find(x => x.name === "Has Altın");

    const hasAlis = parseFloat(has.buying);
    const hasSatis = parseFloat(has.selling);

    function yuvarla(x) {
      return Math.round(x);
    }

    res.json({
      hasAlis,
      hasSatis,

      ceyrekAlis: yuvarla(hasAlis * 1.62),
      ceyrekSatis: yuvarla(hasSatis * 1.64),

      yarimAlis: yuvarla(hasAlis * 3.24),
      yarimSatis: yuvarla(hasSatis * 3.27),

      tamAlis: yuvarla(hasAlis * 6.46),
      tamSatis: yuvarla(hasSatis * 6.52),

      ataAlis: yuvarla(hasAlis * 6.68),
      ataSatis: yuvarla(hasSatis * 6.71),

      ayar22Alis: yuvarla(hasAlis * 0.913),
      ayar22Satis: yuvarla(hasSatis * 0.930)
    });

  } catch (error) {
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

app.listen(3000, () => {
  console.log("Sunucu çalışıyor");
});
