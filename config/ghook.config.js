/**
 * ghook configuration
 *
 * Author: ferenc.szekely@gmail.com
 * License: MIT
 *
 * Copyright (c) 2019 Ferenc Székely
 */
var config = exports = module.exports = {
  // name used in debug logs for instance
  name: 'ghook',
  // title that is used in the views
  title: 'ghook - Github Hook Server',
  // optional: server name where the app is running
  server: 'ghook.local',
  // port where the app will listen to requests
  port: 3000,
  // base path of the checked out projects
  // project URLs will look like: https://ghook.local/hackathon/[project]
  base: '/hackathon',
  // local directory where the github repositories are cloned
  // this directory must be owned by the same user who runs github hook server
  checkouts: '/var/www/checkouts'
}
