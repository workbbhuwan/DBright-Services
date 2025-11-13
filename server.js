const { createServer } = require('http');
const next = require('next');

const dev = false; // production on cPanel
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const port = process.env.PORT || 3000; // Passenger provides PORT
    createServer((req, res) => handle(req, res)).listen(port, () => {
        console.log(`Next.js app ready on port ${port}`);
    });
});