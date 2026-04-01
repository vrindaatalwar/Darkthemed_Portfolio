<div align="center">

# Dark Themed Portfolio Template

An ultra-sleek, high-contrast React portfolio template designed for developers, builders, and thinkers.

[![Star on GitHub](https://img.shields.io/github/stars/vrindaatalwar/portfolio?style=social)](https://github.com/vrindaatalwar/portfolio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

A modern, highly-polished personal portfolio template built with a focus on elegant typography, smooth motion, and a clean minimalist aesthetic. It features a complete **"Zero-Code Configuration"** system — meaning you can personalize the entire site without ever touching the React UI components.

## Features

- **Zero-Code Data Setup**: 100% of the site's content (bio, experience, projects, social links) is abstracted into a single `src/config.tsx` file.
- **Dynamic GitHub Activity Graph**: Automatically pulls your real-time GitHub contribution calendar (complete with fallback logic).
- **Premium Animations**: Powered by Framer Motion, featuring interactive scroll progress trackers, a multilingual hero greeting, and butter-smooth hover scaling.
- **Responsive Stack Carousel**: An elegant auto-scrolling logomark carousel with custom CSS masking fades.
- **Responsive & Performant**: Built on Vite with Tailwind CSS, ensuring a perfect layout across all mobile and desktop viewports.

## Getting Started

Skip the heavy lifting. Clone the repository, modify the configuration file, and deploy.

### 1. Clone the repository
```bash
git clone https://github.com/vrindaatalwar/portfolio.git my-portfolio
cd my-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Customize Your Data
Open `src/config.tsx` in your editor. Replace the placeholder data (Name, GitHub username, Bio, Projects) with your own information. The entire website will inherit your data and instantly re-render.

> **Note**: Be sure to add your GitHub username to `CONFIG.github.username` so the contribution calendar connects to your profile.

### 4. Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view your portfolio.

## Support the Project

If you found this template helpful or used it to build your own personal site, please consider giving it a Star on GitHub. It actively supports the continued development of this project.

---

### Built With

- **React + Vite**: For a fast, modern development experience.
- **Tailwind CSS**: Leveraging the latest styling patterns for a high-end feel.
- **Framer Motion**: Powering fluid UI interactions.
- **react-github-calendar**: Seamless contribution graph integration.
- **Lucide React**: Clean, consistent iconography.

## License

Design and code by [Vrindaa Talwar](https://github.com/vrindaatalwar).

Released under the MIT License. Feel free to use, modify, and build upon this template for your personal site.
