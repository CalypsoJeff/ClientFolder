
const Footer = () => {
    return (
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <a href="/" className="text-2xl font-display font-bold text-orca-800 tracking-tight inline-block mb-4">
                ORCA
              </a>
              <p className="text-gray-600 mb-6 max-w-xs">
                Simplicity is the ultimate sophistication in digital experiences.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                  <a 
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-orca-600 hover:bg-orca-50 transition-colors"
                    aria-label={`${social} link`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {social === 'twitter' && (
                        <path d="M22 4.01C21 4.5 20.02 4.69 19 5C17.879 3.735 16 3.665 14.14 4.482C12.28 5.3 11.142 7.235 11.5 9.5C8.14 9.3 5.18 7.68 3 5C3 5 -1 13.37 8 17C6 18 4 19 1 19C4 21 7 22 10 22C17.1 22 22 16.47 22 9.5C22 9.22 21.97 8.94 21.92 8.67C21.97 8.4 22 8.15 22 7.87C22 6.73 21.45 5.61 20.5 5C21.5 5 22 4.01 22 4.01Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {social === 'facebook' && (
                        <path d="M18 2H15C12.791 2 11 3.791 11 6V9H7V13H11V22H15V13H19L20 9H15V6C15 5.448 15.448 5 16 5H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                      {social === 'instagram' && (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18 6L18.0002 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </>
                      )}
                      {social === 'github' && (
                        <path d="M9 19C4.5 20.5 4.5 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Product
                  </h3>
                  <ul className="space-y-3">
                    {['Features', 'Integrations', 'Pricing', 'Updates', 'Security'].map((item) => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-orca-600 transition-colors hover-link">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-orca-600 transition-colors hover-link">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Support
                  </h3>
                  <ul className="space-y-3">
                    {['Documentation', 'Contact', 'Knowledge Base', 'FAQ', 'Community'].map((item) => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-orca-600 transition-colors hover-link">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ORCA. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#privacy" className="text-sm text-gray-500 hover:text-orca-600 transition-colors hover-link">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-gray-500 hover:text-orca-600 transition-colors hover-link">
                Terms of Service
              </a>
              <a href="#cookies" className="text-sm text-gray-500 hover:text-orca-600 transition-colors hover-link">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  