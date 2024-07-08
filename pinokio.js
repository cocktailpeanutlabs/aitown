const path = require('path')
module.exports = {
  version: "1.5",
  title: "AITown",
  description: "Build and customize your own version of AI town - a virtual town where AI characters live, chat and socialize https://github.com/a16z-infra/ai-town",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "node_modules")
    let running = await kernel.running(__dirname, "start.js")
    let db_exists = await kernel.exists(__dirname, "app", "convex_local_backend.sqlite3")
    let db_menu = [{
      icon: 'fa-solid fa-bomb',
      text: "Reset DB",
      href: "explode.js",
    }, {
      icon: "fa-solid fa-database",
      text: "Download DB",
      href: "app/convex_local_backend.sqlite3?raw=true",
      popout: true,
    }]
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }].concat((db_exists ? db_menu : []))
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        let items = [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: 'fa-regular fa-pen-to-square',
          text: 'World Editor',
          href: 'edit.js',
        }]
        let local = kernel.memory.local[path.resolve(__dirname, "edit.js")]
        if (local && local.manager) {
          items = items.concat({
            icon: 'fa-solid fa-globe',
            text: 'World Editor UI',
            href: local.manager + "?raw=true",
            popout: true
          })
        }
        items = items.concat((db_exists ? db_menu : []))
        items = items.concat([{
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset Project",
          href: "reset.js",
        }])
        return items
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
