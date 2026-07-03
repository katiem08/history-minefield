# History Minefield

A lightweight browser game where players select historical figures from the most recent birthdate to the oldest. Correct answers turn green; one wrong answer ends the round and reveals the score.

## Files GitHub Pages needs

The playable site is made from these root-level files:

- `index.html`
- `styles.css`
- `game.js`

No build step is required.

## Deploying on GitHub Pages from a phone

If GitHub will not let you save the Pages settings, first make sure the three site files above are committed in the repository's `main` branch.

Then use one of these options:

### Option A: Use the included GitHub Actions workflow

This repository includes `.github/workflows/pages.yml`, which publishes the static site automatically whenever the `main` branch changes.

1. Open the repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. If GitHub shows a **Save** button, tap **Save**.
5. Go to the **Actions** tab and open **Deploy static site to GitHub Pages** to watch the deployment.

### Option B: Deploy directly from the branch

1. Open the repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main`.
5. Set the folder to `/ (root)`, not `/root`.
6. Tap **Save**.

After GitHub finishes deploying, the game will be available at a URL like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## Development check

Run the test suite with:

```sh
npm test
```
