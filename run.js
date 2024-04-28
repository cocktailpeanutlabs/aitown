module.exports = {
  daemon: "{{args.daemon}}",
  run: [{
    method: "shell.run",
    params: {
      path: "app",
      message: "{{args.cmd}}"
    }
  }]
}
