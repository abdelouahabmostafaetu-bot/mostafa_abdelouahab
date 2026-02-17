# My Academic Website

A personal academic website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Designed for mathematics researchers and students who want a clean, professional online presence.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

The static site will be generated in the `out/` folder.

---

## 📝 How to Update Content

You do NOT need to be a programmer to update content. Here's how:

### ✏️ Add a Blog Post

1. Create a new `.mdx` file in `src/content/blog/`
2. Name it with a URL-friendly slug, e.g., `my-new-post.mdx`
3. Add the required frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2026-03-15"
category: "Mathematics"
excerpt: "A short description of your post."
---

Your content here. You can use **bold**, *italic*, and math:

Inline math: $E = mc^2$

Display math:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

4. Save the file — it will appear automatically on the blog page!

### 📚 Add a Book

Open `src/content/books.json` and add a new entry:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "cover": "/images/books/book-slug.jpg",
  "category": "Analysis",
  "rating": 5,
  "review": "Your personal review of the book."
}
```

Categories you can use: `Analysis`, `Topology`, `Dynamical Systems`, `Integral Calculus`

### 📄 Add a Publication

Open `src/content/publications.json` and add a new entry:

```json
{
  "title": "Paper Title",
  "authors": ["Your Name", "Co-Author"],
  "venue": "Journal or Conference Name",
  "year": 2026,
  "abstract": "Brief abstract of the paper.",
  "pdf": "/files/publications/paper-name.pdf",
  "arxiv": "https://arxiv.org/abs/...",
  "tags": ["dynamical-systems", "stability"]
}
```

### 📎 Add a Downloadable File

Simply drop the PDF into the correct folder:
- **CV**: `public/files/cv.pdf`
- **Publications**: `public/files/publications/`
- **Lecture Notes**: `public/files/notes/`
- **Thesis**: `public/files/thesis/memoire.pdf`

### 📸 Update Your Photo

Replace the image file at:
- **Main photo**: `public/images/profile/main-photo.jpg`
- **About page photo**: `public/images/profile/about-photo.jpg`

### 📋 Edit Your Biography

Edit the file `src/content/bio.md` — it's plain Markdown.

### 🎓 Update Education Timeline

Edit `src/content/education.json`:

```json
{
  "year": "2024 – 2026",
  "title": "Master's Degree in Fundamental Mathematics",
  "institution": "University of Mila, Algeria",
  "description": "Research focus on dynamical systems."
}
```

---

## 🌐 Deploy to Vercel (Free)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Import Project" and select your repository
4. Vercel will automatically detect Next.js — click "Deploy"
5. Your site will be live at `your-project.vercel.app`

To use a custom domain, go to your Vercel project settings → Domains.

---

## 📁 Project Structure

```
src/
├── app/                    # Pages (Next.js App Router)
│   ├── layout.tsx          # Root layout (navbar + footer)
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── research/page.tsx   # Research page
│   ├── books/page.tsx      # Books page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/page.tsx # Individual blog post
│   ├── resources/page.tsx  # Resources page
│   └── contact/page.tsx    # Contact page
├── components/             # Reusable components
├── content/                # YOUR CONTENT LIVES HERE
│   ├── blog/               # Blog posts (.mdx files)
│   ├── books.json          # Book recommendations
│   ├── publications.json   # Research publications
│   ├── education.json      # Education timeline
│   └── bio.md              # Your biography
├── lib/                    # Utility functions
└── styles/                 # Global CSS

public/
├── images/                 # Images
│   ├── profile/            # Your photos
│   ├── books/              # Book covers
│   └── blog/               # Blog post images
└── files/                  # Downloadable files
    ├── cv.pdf              # Your CV
    ├── publications/       # Research PDFs
    ├── notes/              # Lecture notes
    └── thesis/             # Thesis/mémoire
```

---

## ✨ Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle
- ✅ LaTeX/KaTeX math rendering in blog posts
- ✅ MDX blog with code syntax highlighting
- ✅ Scroll animations
- ✅ SEO-optimized metadata
- ✅ Static export (no server needed)
- ✅ Contact form (via Formspree)
- ✅ Book recommendations with ratings & filtering
- ✅ Publication list with abstract toggle
- ✅ Education timeline
- ✅ Table of contents for long articles

---

## ⚙️ Contact Form Setup

The contact form uses [Formspree](https://formspree.io):

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID
3. Open `src/app/contact/page.tsx`
4. Replace `YOUR_FORM_ID` with your actual form ID:
   ```
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

---

## 🛠 Personalization Checklist

Before deploying, update these items:

- [ ] Replace "Your Name" with your actual name (search all files)
- [ ] Replace "YN" initials in Navbar, HeroSection, and favicon
- [ ] Update email address (`your.email@university.dz`)
- [ ] Update LinkedIn and social media URLs
- [ ] Add your profile photos to `public/images/profile/`
- [ ] Edit your biography in `src/content/bio.md`
- [ ] Update publications in `src/content/publications.json`
- [ ] Set up Formspree and update the form ID in contact page
- [ ] Replace the advisor name in research page
- [ ] Add your actual CV as `public/files/cv.pdf`

---

## 📜 License

This project is for personal academic use. Feel free to adapt it for your own academic website.
