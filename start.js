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
        conda: "node18",
        env: {
          //LLM_MODEL: "llama3",
          //RUST_LOG: "info"
          // RUST_BACKTRACE: "1",
          //RUST_LOG: "debug",
          RUST_LOG: "warn"
        },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "ollama pull llama3",
          "./convex-local-backend"
          //"just convex dev"
          ////"just run-local-backend"
        ],
        on: [{
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          //"event": "/http:\/\/\\S+:3210/",   
          "event": "/Running/",
          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
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
          // The regular expression pattern to monitor.
          // When this pattern occurs in the shell terminal, the shell will return,
          // and the script will go onto the next step.
          "event": "/http:\/\/\\S+ai-town/",   

          // "done": true will move to the next step while keeping the shell alive.
          // "kill": true will move to the next step after killing the shell.
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
