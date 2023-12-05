const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/convert', async (req, res) => {
  const { inputUrl, outputUrl } = req.body;

  ffmpeg()
    .input(inputUrl)
    .output(outputUrl)
    .on('end', () => {
      console.log('Conversion finished');
      res.send('Conversion finished');
    })
    .on('error', (err) => {
      console.error('Error:', err);
      res.status(500).send('Error during conversion');
    })
    .run();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
