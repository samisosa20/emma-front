module.exports = {
  apps: [
    {
      name: "FionaNextApp",
      exec_mode: "cluster",
      instances: "1",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3030,
      },
    },
  ],
};
