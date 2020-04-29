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
    },
  ],
};
