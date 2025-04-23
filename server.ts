import express from "express"

const app = express()

interface Routes {
    [key: string]: string
}

const routes: Routes = {}

app.use("/assets", express.static("_site/assets"))

app.get("/", (_, res) => res.sendFile(`${process.cwd()}/_site/index.html`))

for (let route of Object.keys(routes)) {
    let fileName = routes[route]
    app.get(`/${route}`, (_, res) => res.sendFile(`${process.cwd()}/_site/${fileName}`))
}

if (process.env.PORT) app.listen(process.env.PORT)
else {
    console.error("Please provide a port by setting the PORT environment variable")
}
