# working-hour-system-fe

npm version: v20.10.0  
npx version: 10.2.3

## How to deploy single page app to github page with client side routing

> [!WARNING]  
> We can only use root url now

Add basename (your github repo name) to router.

```typescript
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <TimeCard />,
    },
  ],
  { basename: "/working-hour-system-fe" }
);
```

Add github page link to package.json

```json
"homepage": "https://{username}.github.io/{repo name}",
```

Add 404.index to public folder

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; URL=/" />
    <script>
      // Redirect all 404s to index.html for client-side routing to work
      window.location.href = "/";
    </script>
  </head>

  <body></body>
</html>
```

Deploy

```bash
npm run deploy
```
