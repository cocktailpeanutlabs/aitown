module.exports = {
  daemon: "{{args.daemon}}",
  run: [{
    method: "shell.run",
    params: {
      message: "{{args.cmd}}"
    }
  }]
}
