# DW
This is a [Dungeon World](https://www.dungeon-world.com/) implementation of [PbtA-style](https://en.wikipedia.org/wiki/Powered_by_the_Apocalypse?utm_source=chatgpt.com) character sheets.

It is online at https://tznind.github.io/st/dw.html


## Live Character Sheet

Players can create their own characters, choose skills etc. Data is saved only into the address bar (URL) - allowing sharing/saving for later e.g. as a bookmark.

For upstream template repository, see https://github.com/tznind/lc

### Url Length 
There is a maximum url Length of ~8000 characters.  This is enforced by GitHub Pages. In practice, you should not reach this unless you have a large number of free text inputs into which your players add a lot of text. 

See [LIMITATIONS.md](./LIMITATIONS.md) for details.

## Powered by the Apocalypse

You can read more about Powered by the Apocalypse, including their permissive license terms, here:

https://lumpley.games/2023/11/22/what-is-pbta/
The system will automatically load the moves file and make the role available.


## Sync changes

If after using the template, if find new features have been added that you want to sync into your repository run the following to sync changes:

```
git remote add upstream https://github.com/tznind/lc
git fetch upstream

git checkout main
git merge upstream/main --allow-unrelated-histories
```

(for merge conflicts e.g. in data folder - always keep your own changes and discard incoming)

## Testing Locally

To run the page locally (i.e. not in GitHub Pages) you can use any of:

```powershell
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP  
php -S localhost:8000
```

Then visit `http://localhost:8000/cs.html`
