import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

// TEST ANA SAYFA
app.get("/", (req, res) => {
  res.send("Backend çalışıyor");
});

// ALTIN FİYATLARI API
app.get("/api/altin", async (req, res) => {
  try {
    const response = await fetch("https://kapalicarsi.apiluna.org/");
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Altın verisi alınamadı" });
  }
});

app.listen(PORT, () => console.log("Sunucu çalışıyor"));
