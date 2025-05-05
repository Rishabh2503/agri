import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Add Google Translate script if it doesn't exist
    const addGoogleTranslateScript = () => {
      const scriptId = 'google-translate-script';
      if (document.getElementById(scriptId)) return;

      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            includedLanguages: 'hi,ta,te,bn,mr,gu,kn,ml,pa,ur' // Common Indian languages
          },
          'google_translate_element'
        );

        // For mobile version
        if (document.getElementById('google_translate_element_mobile')) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              includedLanguages: 'hi,ta,te,bn,mr,gu,kn,ml,pa,ur' // Common Indian languages
            },
            'google_translate_element_mobile'
          );
        }
      }
    };

    addGoogleTranslateScript();

    // Add custom styles to override Google Translate's default styling
    const addCustomStyles = () => {
      const styleId = 'google-translate-custom-styles';
      if (document.getElementById(styleId)) return;

      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        /* Custom styles for Google Translate */
        .goog-te-gadget {
          font-family: 'Montserrat', sans-serif !important;
          color: #4A5568 !important;
        }
        .goog-te-gadget-simple{
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
    margin: 0 !important;
    width: auto !important;
    height: auto !important;
}
.goog-te-gadget-simple .VIpgJd-ZVi9od-xl07Ob-lTBxed{
    display: inline-flex !important;
    align-items: center;
}
        .goog-te-menu-value {
          color: #4A5568 !important;
          font-weight: 500 !important;
        }
        .goog-te-menu-value:hover {
          text-decoration: none !important;
          color: #48BB78 !important;
        }
        .goog-te-menu-value span {
          text-decoration: none !important;
        }
        .goog-te-banner-frame {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        .goog-te-menu2 {
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          font-family: 'Montserrat', sans-serif !important;
        }
        .goog-te-menu2-item div {
          padding: 8px 12px !important;
          font-size: 14px !important;
        }
        .goog-te-menu2-item:hover div {
          background-color: #F0FFF4 !important;
          color: #22543D !important;
        }
      `;
      document.head.appendChild(style);
    };

    addCustomStyles();

    // Clean up
    return () => {
      delete window.googleTranslateElementInit;
      // Optionally remove the style and script tags if you want complete cleanup
      // document.getElementById('google-translate-script')?.remove();
      // document.getElementById('google-translate-custom-styles')?.remove();
    };
  }, []);

  return (
    <div className='translate-wrapper relative'>
      <div
        id='google_translate_element'
        className='translate-component'></div>
    </div>
  );
};

export default GoogleTranslate;
