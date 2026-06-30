# Safayet Ullah - Premium Interactive 3D Portfolio

A reusable, organized, responsive portfolio built for GitHub + Vercel deployment.

This version uses a warm premium visual identity instead of the common all-black 3D portfolio style. It includes a procedural interactive 3D hero scene, project cards, skills, timeline, testimonials, contact section, resume download, and centralized data editing.

## Stack

- Next.js App Router
- React
- TypeScript
- Three.js
- React Three Fiber
- Drei
- Lucide React icons
- Plain CSS with custom design tokens

## Quick start

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload/push this project folder.
3. Go to Vercel.
4. Import the GitHub repo.
5. Keep default settings.
6. Deploy.

## The main file to edit

Most content is controlled from:

```text
src/data/site.ts
```

Edit these values first:

```ts
name
role
university
location
email
profileImage
resumePath
social
skillGroups
projects
experience
testimonials
```

## Add your real photo

Put your picture here:

```text
public/images/profile.jpg
```

Then update this line in `src/data/site.ts`:

```ts
profileImage: '/images/profile.jpg'
```

Recommended image size:

```text
900 x 1000 px or larger
JPG, PNG, or WebP
Portrait crop works best
```

## Replace the resume

A placeholder PDF is already included so the Download Resume button works.

Replace:

```text
public/resume-safayet-ullah.pdf
```

with your real resume PDF.

## Add real projects

In `src/data/site.ts`, update each project:

```ts
{
  title: 'Project Name',
  category: 'Web App',
  year: '2026',
  image: '/images/project-name.png',
  summary: 'Short explanation of the project.',
  stack: ['Next.js', 'TypeScript'],
  highlights: ['Feature 1', 'Feature 2'],
  liveUrl: 'https://your-live-link.com',
  sourceUrl: 'https://github.com/yourusername/project'
}
```

Put project screenshots inside:

```text
public/images/
```

## 3D scene customization

The interactive hero scene is here:

```text
src/components/three/InteractiveScene.tsx
```

It is procedural, so no heavy 3D model is required. This keeps the portfolio fast and easier to deploy.

You can change colors and shapes inside:

```text
CoreSculpture
ParticleHalo
CameraRig
```

## Design customization

Global colors, spacing, typography, and responsive styling are here:

```text
src/app/globals.css
```

Main design tokens are at the top:

```css
:root {
  --paper: #fff9ee;
  --blue: #244dd8;
  --coral: #ef765f;
  --violet: #7c4dff;
  --mint: #17a88b;
}
```

## Folder structure

```text
safayet-3d-portfolio/
  public/
    images/
    models/
    resume-safayet-ullah.pdf
  src/
    app/
      globals.css
      layout.tsx
      page.tsx
    components/
      three/
      ui/
      About.tsx
      Contact.tsx
      Experience.tsx
      Footer.tsx
      Hero.tsx
      Navbar.tsx
      Projects.tsx
      Skills.tsx
      Spotlight.tsx
      Testimonials.tsx
    data/
      site.ts
```

## Notes

- The site is responsive for desktop, tablet, and phone.
- The 3D scene is client-only to avoid server-side WebGL errors.
- The portfolio is content-first, so the 3D effect adds memorability without hiding the important information.
- Replace dummy data before applying for internships or jobs.
