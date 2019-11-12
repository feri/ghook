/**
* ghook - index route
* 
* Handles simple GET and POST requests
*
* Author: ferenc.szekely@gmail.com
* License: MIT
*
* Copyright (c) 2019 Ferenc Székely
*/
let app = require('../app');
let express = require('express');
let router = express.Router();

const fs = require('fs');
const fsExtra = require('fs-extra');

/* GET */
router.get('/', function(req, res, next) {
  fs.readdir(req.app.config.checkouts, (err, files) => {
    let data = {};
    if (err) {
      console.error(err);
      data = {title: req.app.config.title};
    } else {
      console.log(files);
      data = {title: req.app.config.title, base: req.app.config.base, projects: files};
    }
    res.render('index', data);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  let msg = 'ack';
  const { spawn } = require('child_process');
  let pushObj = req.body;
  let checkOutDir, normName, mode;

  // check if repository.clone_url is available
  if (typeof pushObj.repository.clone_url === 'undefined') {
    msg = 'failed: no clone_url in push message';
  } else {
    // check if repository.full_name is available
    if (typeof pushObj.repository.full_name === 'undefined') {
      msg = 'failed: cannot determine full name of repository';
    } else {
      // 1. normalize repository.full_name (ie. replace / with _) 
      normName = String(pushObj.repository.full_name).replace(/\//g, '_');
      // 2. check if we have a subdir at config.checkouts location with the name
      mode = "755";
      checkOutDir = req.app.config.checkouts + '/' + normName;
      fsExtra.pathExists(checkOutDir, (err, exists) => {
        if (exists) {

          // 3. change to the checkOutDir
          process.chdir(checkOutDir);
          console.log(`New directory: ${process.cwd()}`);

          const pull = spawn('git', ['pull']);

          pull.stdout.on('data', (data) => {
            console.log(data.toString());
          });

          pull.stderr.on('data', (data) => {
            console.error('git pull stderr: ${data}');
          });

          pull.on('close', (code) => {
            if (code !== 0) {
              console.log('git pull exited with code: ', code);
            }
          });
          
          pull.on('error', (err) => {
            console.error('git pull failed: ', err);
          });

        } else {
          // 4b. clone the git repo to checkOutDir
          const clone = spawn('git', ['clone', pushObj.repository.clone_url, checkOutDir]);

          clone.stdout.on('data', (data) => {
            console.log(data.toString());
          });

          clone.stderr.on('data', (data) => {
            console.error('git clone stderr: ', data.toString());
          });

          clone.on('close', (code) => {
            if (code !== 0) {
              console.log('git clone exited with code: ', code);
            }
          });
          
          clone.on('error', (err) => {
            console.error('git clone failed: ', err);
          });
        }
      })
    }
  }

  let resp = {
    msg: msg
  }
  
  res.send(JSON.stringify(resp));
});

module.exports = router;
