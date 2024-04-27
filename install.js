module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        conda: "node18",
        message: [
          "git clone https://github.com/peanutcocktail/ai-town.git app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
//        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "conda install -y -c conda-forge nodejs==18.19.0 just rust",
          "node -v",
          "npm install",
        ]
      }
    },
//    {
//      method: "fs.download",
//      params: {
//        uri: "https://github.com/get-convex/convex-backend/releases/download/precompiled-2024-04-26-560e5a3/convex-local-backend-aarch64-apple-darwin.zip",
//        dir: "app"
//      }
//    },
//    {
//      method: "shell.run",
//      params: {
//        message: "unzip convex-local-backend-aarch64-apple-darwin.zip",
//        path: "app"
//      }
//    },
    //  Uncomment this step to add automatic venv deduplication (Experimental)
    //  {
    //    method: "fs.link",
    //    params: {
    //      venv: "app/env"
    //    }
    //  },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
