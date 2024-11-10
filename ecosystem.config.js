require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "FionaNextApp",
      exec_mode: "cluster",
      instances: "1", // Or a number of instances
      script: "node_modules/next/dist/bin/next",
      args: "start -p " + process.env.NEXT_PUBLIC_PORT,
      env_local: {
        APP_ENV: "local",
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
      },
      env_development: {
        APP_ENV: "dev",
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
      },
      env_production: {
        APP_ENV: "prod",
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
      },
    },
  ],
};
