// Renders a branded error page for SSR failures

export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Something went wrong — CultureConnect</title>
  <style>
    body {
      font-family: "DM Sans", system-ui, sans-serif;
      background: #F5F0E8;
      color: #1A1712;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 1rem;
    }
    .container {
      max-width: 420px;
      text-align: center;
    }
    h1 {
      font-family: "Instrument Serif", Georgia, serif;
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
    p {
      color: #8B8178;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
    a {
      display: inline-block;
      background: #C8502A;
      color: white;
      padding: 0.625rem 1.5rem;
      border-radius: 9999px;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }
    a:hover { background: #A8401F; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Something went wrong</h1>
    <p>We hit an unexpected error. Please try refreshing the page or come back later.</p>
    <a href="/">Go home</a>
  </div>
</body>
</html>`;
}
