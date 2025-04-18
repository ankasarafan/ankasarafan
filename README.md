 
## Features

-   🌐 SSR (Server Side Rendering)
-   📱 Responsive design
-   🌙 Dark mode support
-   🔍 Search videos by name
-   🗂️ Folders as Channels
-   ▶️ Video player
-   📝 Video subtitles
-   📥 Video download
-   ❤ Client side like/dislike videos

## Live Demo

A live demo of the project is available at [https://AGC-web.pages.dev](https://AGC-web.pages.dev/).

## Configuration

The following environment variables are required to run the project:


## Development

1. Clone the repository

```bash
git clone <repo-url> AGC-web
cd AGC-web
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

1. Clone the repository

```bash
git clone <repo-url> AGC-web
cd AGC-web
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

4. Start the server

```bash
npm run start
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Cloudflare Pages

1. Fork the [repository]on GitHub.
2. Create a new project on [Cloudflare Pages](https://pages.cloudflare.com/).
3. Connect your GitHub account with Cloudflare Pages.
4. Select the forked repository and click on `Begin Setup`.
5. Select `nextjs` as the build preset.
6. Add required environment variables (`AGC_API_KEY`).
7. Click on `Save and Deploy` to start the deployment. This first deployment will not be fully functional as the next step is also necessary.
8. In your Pages project, go to Settings > Functions > Compatibility Flags.
9. Configure a nodejs_compat flag for both production and preview.
10. Go to the Deployments tab, open the latest deployment and click on Manage Deployment > Retry Deployments.
11. Click on `Visit Site` to open the website.

More information about deploying Next.js apps on Cloudflare Pages is available [here](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#deploy-via-the-cloudflare-dashboard).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Disclaimer

This project is not affiliated with https://AGC.com in any way. It is just a frontend for their API.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
