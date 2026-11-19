module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        env: {
          RUST_LOG: "warn"
        },
        path: "app",
        message: [
          "ollama pull llama3",
        ],
        on: [{
          "event": "/Running/",
          "done": true
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        env: {
          RUST_LOG: "warn"
        },
        path: "app",
        message: [
          "{{platform === 'win32' ? 'convex-local-backend.exe' : './convex-local-backend'}}"
        ],
        on: [{
          "event": "/local_backend|Running|listening/i",
          "done": true
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        message: "npm run dev",
        path: "app",
        on: [{
          "event": "/http:\/\/\\S+ai-town/",   
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
