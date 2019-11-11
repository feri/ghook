== ghook

A simple Github web hook server app that can listen to push notifications coming
from Github repository. Based on the notifications the app will perform actions 
on the server where it has been installed.

Getting Started
===
Fetch all dependencies:
```
$ npm install
```

Start the app on a server:
```
$ bin/www
```

Configuration
===
The app has a configuration file (config/ghook.config.js). Options that can be 
configured are the following

```
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
```

Please always restart the application if you made changes to the configuration.

<add more docs on configuration>
