const config = require('./config/config');

module.exports = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello from ${config.projectTitle}</title>
        <style>
            body {
                background-color: #111;
            }
            .container {
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            h1 {
                color: grey;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .highlight {
                color: white;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>👋🏼 Hello from <span class="highlight">${config.projectTitle}!</span></h1>
        </div>
    </body>
</html>`;
};
