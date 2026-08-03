const Footer = () => {
  return (
    <footer className="mt-10 bg-black text-gray-300">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-amber-400">
            Sumitra Mehandi Artworks
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-6">
            Beautiful Mehndi Designs, Bridal Artworks, Creative Patterns &
            Inspiration.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Explore
          </h3>

          <div className="space-y-2 text-sm">
            <p>Featured Blogs</p>
            <p>Latest Posts</p>
            <p>Most Viewed</p>
            <p>Reader's Choice</p>
          </div>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Information
          </h3>

          <div className="space-y-2 text-sm">
            <p>About Us</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Support</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>

          <div className="space-y-2 text-sm">
            <p>📞 9785827828</p>
            <p>📍 Gayatri Nagar, Bhilwara</p>
            <p>📷 Instagram</p>
            <p className="text-amber-400">@sumi_mehndi_artworks</p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-400">
        © 2026 <span className="text-amber-400 font-semibold">Sumitra Mehandi Artworks</span>. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;