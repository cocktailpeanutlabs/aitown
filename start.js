module.exports = {
  daemon: true,
  run: [
    {
      "method": "modal",
      "params": {
        "title": "Ollama",
        "description": "Launch Ollama before proceeding.",
        "menu": [{
          "text": "Install Ollama",
          "href": "https://ollama.com/"
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        env: {
          RUST_LOG: "warn"
        },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
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
        },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "{{platform === 'win32' ? 'convex-local-backend.exe' : './convex-local-backend'}}"
        ],
        on: [{
          "event": "/.+/",
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
      // This step sets the local variable 'url'.
      // This local variable will be used in pinokio.js to display the "Open WebUI" tab when the value is set.
      method: "local.set",
      params: {
        // the input.event is the regular expression match object from the previous step
        url: "{{input.event[0]}}"
      }
    }
  ]
}
