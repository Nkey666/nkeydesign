// Конфиг pm2 — менеджер процессов, держит сайт запущенным и поднимает после перезагрузки.
// Запуск: pm2 start deploy/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "nkeydesign",
      cwd: "/var/www/nkeydesign",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "700M",
    },
  ],
};
