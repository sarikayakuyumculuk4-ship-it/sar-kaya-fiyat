app.get("/altin", async (req, res) => {
  try {
    const response = await fetch("https://www.haremaltin.com/api/altin-fiyatlari");
    const data = await response.json();

    // HAS ALTIN
    const hasAlis = parseFloat(data.find(x => x.name === "Has Altın").buying);
    const hasSatis = parseFloat(data.find(x => x.name === "Has Altın").selling);

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
