const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { spawn } = require('node:child_process'); // helps launch external process

const fs = require('fs'); // helps write into a file
const { log } = require('console');

// const path2 = path.join(__dirname, '../public/uploads/');
// console.log(path2);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const srcml = 'srcml';

/**
 * create srcml file
 * @param program - external program to be called
 * @param option - program arguments. in this case is the file to be converted location.
 * @param destFile - program argument. the file destination that will contain the srcml converted code.
 */
function srcmlFileCreation(program, option, destFile) {
  const command = spawn(program, [`${option}`, '-o', `${destFile}`]);

  command.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  command.on('close', (code) => {
    console.log(`srcml process existed with code ${code}`);
  });
}

function convertSrcCode(program, srcCode, txtFilePath, res) {
  const command = spawn(program, [txtFilePath]);
  let responseData = '';

  // writing to file
  fs.writeFile(txtFilePath, srcCode, (error) => {
    console.log({
      errorcode: '0000',
      message: 'Error during writing to file 1',
    });
    if (error) throw error;
  });

  command.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    responseData += data;
  });
  command.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  command.on('close', (code) => {
    console.log(`stderr: ${code}`);
    res.send(responseData);
  });
}

router.post('/', upload.single('uploadedFile'), function (req, res, next) {
  // console.log(req);

  try {
    if (req.body.srcCode) {
      const txtFileDir = path.join(
        __dirname,
        `../public/srcmlFiles/srcmlTxtFile.${req.body.selectedLang}`
      );
      convertSrcCode(srcml, req.body.srcCode, txtFileDir, res);
    } else {
      const filePath = req.file.path;
      const xmlFile = req.file.filename.replace(/\..*/, '.xml');
      const destPath = path.join(__dirname, `../public/srcmlFiles/${xmlFile}`);
      const srcCode = console.log(filePath);
      console.log(xmlFile);
      console.log(destPath);

      srcmlFileCreation(srcml, filePath, destPath);

      res.send('srcml file converted successfully. Please download');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
