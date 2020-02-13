module.exports = {
  apps: [
    {
      name: 'BidSideAPI',
      script: './dist/main.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      // args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      // eslint-disable-next-line @typescript-eslint/camelcase
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        jwtSecret: 'supersecret',
        mongodbUser: 'rendszerf',
        mongodbPswd: 'cBiuMYANMuMgv8H9',
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      env_production: {
        NODE_ENV: 'production',
        jwtSecret: 'supersecret',
        mongodbUser: 'rendszerf',
        mongodbPswd: 'cBiuMYANMuMgv8H9',
      },
    },
  ],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
