import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {site.name}. Built with Next.js and React Three Fiber.</span>
        <span>Designed as a reusable premium 3D portfolio system.</span>
      </div>
    </footer>
  );
}
