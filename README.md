# My Wishlist

I love sharing my Amazon wishlist with friends and family. However sometimes I find things I want that aren't on Amazon which makes it 
difficult to share a list with people that allows them to easily find these item. So with the help of [GitHub Copilot](https://copilot.github.com/)
I did what any sensible person would do and wrote a static site generator to serve my wishlist. And you can use it too!

### Getting Started

After you clone the repo install the dependencies

```
npm i
```

I've inlcuded a simple CLI to add your items. Simply run `node index.js` to get started adding items. The CLI will prompt you for the item's
name, description, price, link, and an image url. The program will then add it to the `data.json` file which provides the data for the site.
The program then builds the `index.html` file using this data.

If you just need to rebuild the HTML file (for example if you've made layout changes) just run `node index.js -b`

To preview your wishlist locally before publishing run `npm run serve` to start a local HTTP server. Then you can push your changes. I'm using
GitHub pages to serve the static site.
