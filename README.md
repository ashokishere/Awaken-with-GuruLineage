# Awaken with GuruLineage


A spiritual and high-performance image slideshow application designed for continuous display.

## How to push to GitHub

1. Create a new empty repository on GitHub named `awaken-with-gurulineage`.
2. Open your terminal in this project folder.
3. Initialize the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/awaken-with-gurulineage.git
   git push -u origin main
   ```

## Automatic Deployment

This project uses GitHub Actions (see `.github/workflows/deploy.yml`). 
Once you push to the `main` branch:
1. Go to your GitHub repository's **Actions** tab to watch the build.
2. Once finished, go to **Settings > Pages**.
3. Under **Build and deployment > Branch**, ensure `gh-pages` is selected and the folder is `/ (root)`.
4. Your site will be live at `https://YOUR_USERNAME.github.io/awaken-with-gurulineage/`.
