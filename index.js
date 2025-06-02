const express = require('express');
const moment = require('moment-timezone');

const app = express();
const port = 3000;

const cityTimezones = {
  "Sao_Paulo": "America/Sao_Paulo",
  "Rio_de_Janeiro": "America/Sao_Paulo",
  "Salvador": "America/Bahia",
  "Brasilia": "America/Sao_Paulo",
  "Fortaleza": "America/Fortaleza",
  "Belo_Horizonte": "America/Sao_Paulo",
  "Manaus": "America/Manaus",
  "Curitiba": "America/Sao_Paulo",
  "Recife": "America/Recife",
  "Porto_Alegre": "America/Sao_Paulo",
};

app.get('/time/:city', (req, res) => {
  const originalCityInput = req.params.city;
  // Standardize city name: replace spaces with underscores and convert to title case for map lookup
  const standardizedCity = originalCityInput
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_'); // Also handle hyphens

  const timezone = cityTimezones[standardizedCity];

  if (timezone) {
    const currentTime = moment().tz(timezone).format('HH:mm:ss');
    res.json({ city: originalCityInput, time: currentTime });
  } else {
    res.status(404).json({ error: "City not found or not supported." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
