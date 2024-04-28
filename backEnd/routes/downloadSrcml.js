const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '../public/srcmlFiles/');

router.get('/', function (req, res, next) {
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      return res.status(500).send('error reading directory');
    }

    if (files.length === 0) {
      return res.status(404).send('directory is empty');
    }

    // get the first file
    const firstFile = files[0];
    console.log(firstFile);

    // Set Content-Disposition header to force the browser to download with the original filename
    res.setHeader('Content-Disposition', `attachment; filename="${firstFile}"`);

    // Set Content-Type header to specify the type of content (application/xml in this case)
    res.setHeader('Content-Type', 'application/xml');

    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    // Send the file
    // res.download(`${directoryPath}${firstFile}`);

    // Send the file
    const filePath = path.join(directoryPath, firstFile);
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', (error) => {
      console.error('Error reading file:', error);
      res.status(500).send('Error reading file');
    });

    fileStream.pipe(res);
  });
});

module.exports = router;
