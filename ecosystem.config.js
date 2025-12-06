module.exports = {
  apps: [
    {
      name: "FionaNextApp",
      exec_mode: "cluster",
      instances: "2",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3030,
      },
    },
  ],
};
