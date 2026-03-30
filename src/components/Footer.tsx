const Footer = () => (
  <footer className="border-t border-gold/10 py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-xl font-bold text-gradient-gold">Bhabuji Jinga Mixology</p>
      <p className="text-cream/30 text-sm font-body">
        © {new Date().getFullYear()} All rights reserved. Crafted with passion.
      </p>
    </div>
  </footer>
);

export default Footer;
