module.exports = {
  daemon: true,
  run: [{
    method: "shell.run",
    params: {
      path: "manager",
      message: [
        "npx -y http-server",
      ],
      on: [{
        "event": "/http:\/\/127\\S+/",
        "done": true
      }]
    }
  }, {
    method: "local.set",
    params: {
      manager: "{{input.event[0]}}"
    }
  }]
}
