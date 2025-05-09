# Deploying to GitHub Pages

This guide explains how to deploy this Facebook login UI replica to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Deployment Steps

1. **Create a new GitHub repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click on the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "facebook-login-ui")
   - Set it to Public (GitHub Pages requires public repositories for free accounts)
   - Click "Create repository"

2. **Initialize Git in your local project folder**
   ```bash
   cd /path/to/your/project
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Connect to your GitHub repository**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select "main" branch and "/" (root) folder
   - Click "Save"

5. **Access your deployed site**
   - After a few minutes, your site will be available at:
   - `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## File Structure for GitHub Pages

GitHub Pages works with static files only. Make sure your repository contains:

- `index.html` - The main HTML file (entry point)
- `app.js` - JavaScript file for handling form submission
- Any other static files like CSS, images, etc.

## Important Notes

1. GitHub Pages is for static content only - it cannot run PHP or server-side code
2. All data handling is done client-side with JavaScript
3. For demonstration purposes, this project just redirects to the real Facebook site after form submission
4. In a real application, you would need a backend server to handle form submissions securely 