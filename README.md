# DaMaC Charity Website

## Overview

DaMaC Charity is a community-based nonprofit organization founded in April 2021 by Mr. Dan Magandazi in Uganda. The organization is dedicated to inspiring hope in vulnerable communities through sustainable development initiatives and compassionate outreach programs.

This repository contains the complete source code for the DaMaC Charity website, a responsive and modern web platform designed to showcase the organization's mission, impact, and ongoing initiatives.

![DaMaC Charity](assets/images/damac-logo.jpg)

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Mobile Navigation Fix](#mobile-navigation-fix)
- [Customization Guide](#customization-guide)
- [Content Management](#content-management)
- [Browser Compatibility](#browser-compatibility)
- [Performance Optimization](#performance-optimization)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

The DaMaC Charity website includes:

- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices
- **Modern UI**: Clean, professional appearance with a focus on visual impact and user experience
- **Interactive Navigation**: User-friendly navigation with dropdown menus and mobile optimization
- **Impact Showcase**: Dynamic sections highlighting the organization's achievements and success stories
- **Program Listings**: Dedicated pages for the organization's various initiatives and outreach programs
- **Media Gallery**: Visual documentation of community projects and activities
- **Donation System**: Integration-ready structure for accepting online donations
- **Contact Forms**: User-friendly forms for inquiries, volunteer sign-ups, and partnerships
- **Newsletter Integration**: Email subscription functionality for community updates
- **Social Media Integration**: Connected social presence with share functionality
- **Optimized Performance**: Fast loading times with lazy-loaded images and optimized assets

## Project Structure

```
damac-charity-website/
│
├── index.html                     # Homepage
├── about.html                     # About DaMaC page
├── programs.html                  # Programs overview page
├── get-involved.html              # Volunteer and partnership page
├── success-stories.html           # Impact stories and testimonials
├── gallery.html                   # Photo and video gallery
├── donate.html                    # Donation page
├── contact.html                   # Contact information and form
│
├── assets/
│   ├── images/                    # Website images and photos
│   │   ├── damac-logo.jpg         # Organization logo
│   │   ├── hero-image.jpeg        # Homepage hero image
│   │   ├── about-image.jpg        # About page main image
│   │   └── ...                    # Other images
│   │
│   ├── fonts/                     # Custom font files (if any)
│   └── docs/                      # Downloadable documents
│
├── styles.css                     # Main stylesheet
├── script.js                      # Main JavaScript file
│
├── LICENSE                        # MIT License file
└── README.md                      # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup for content structure
- **CSS3**: Advanced styling with flexbox and grid layouts
- **JavaScript**: Vanilla JS for interactive elements
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Montserrat and Open Sans font families
- **Responsive Design**: Mobile-first approach with media queries
- **Performance Optimization**: Image compression and lazy loading

## Getting Started

### Prerequisites

- A web server or hosting service to deploy the website
- Basic knowledge of HTML, CSS, and JavaScript for customization
- Text editor or IDE (e.g., Visual Studio Code, Sublime Text)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/damac-charity-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd damac-charity-website
   ```

3. Open the website locally:
   ```bash
   # Using Python's built-in server (if Python is installed)
   python -m http.server 8000
   
   # Or use any web server of your choice
   ```

4. Visit `http://localhost:8000` in your web browser.

### Deployment

To deploy the website to a production server:

1. Upload all files to your hosting service via FTP or your hosting provider's dashboard
2. Ensure proper file permissions (typically 644 for files and 755 for directories)
3. Configure any server-side functionality (e.g., contact form processing) as needed

## Mobile Navigation Fix

A known issue with earlier versions of the site involved the mobile navigation menu not functioning correctly. The issue has been fixed in the current version, but if you encounter problems:

1. Ensure the latest version of `script.js` is implemented
2. Check that the mobile menu toggle HTML structure matches:
   ```html
   <div class="mobile-menu-toggle" aria-label="Toggle mobile menu">
       <span></span>
       <span></span>
       <span></span>
   </div>
   ```

3. Verify CSS for mobile navigation:
   ```css
   .nav-menu {
       /* Your existing styles */
       right: -100%; /* Off-screen by default on mobile */
       transition: right 0.3s ease; /* Smooth transition */
   }

   .nav-menu.active {
       right: 0; /* Slide in when active */
   }
   ```

4. If issues persist, check browser console for errors and ensure all JavaScript is being loaded correctly.

## Customization Guide

### Colors and Branding

The website uses a consistent color scheme defined in CSS variables. To change the color scheme:

1. Edit the `:root` section in `styles.css`:
   ```css
   :root {
       --primary-color: #FF8C00; /* Orange */
       --primary-dark: #E67300; /* Darker Orange */
       --primary-light: #FFB347; /* Lighter Orange */
       --secondary-color: #003366; /* Navy Blue */
       --secondary-dark: #00264D; /* Darker Blue */
       --secondary-light: #405F8C; /* Lighter Blue */
       --accent-color: #7FBD32; /* Green accent */
       /* Other variables... */
   }
   ```

2. Replace logo images in `assets/images/` directory.

### Content Management

To update the website content:

1. **Text Content**: Edit the HTML files directly, focusing on content within the main sections and avoiding changes to structural elements.

2. **Images**: 
   - Replace images in the `assets/images/` directory
   - Ensure new images are optimized for web (compressed, appropriate dimensions)
   - Update image references in HTML files accordingly

3. **Adding New Pages**:
   - Create a new HTML file based on an existing template
   - Update navigation menus in all pages to include the new page
   - Link the new page from relevant sections of the website

### Form Functionality

The contact and newsletter forms require server-side processing to send emails or store submissions. To implement:

1. Create a server-side script (PHP, Node.js, etc.) to process form submissions
2. Update form action attributes to point to your processing script
3. Implement appropriate validation and security measures
4. Add success/error handling for user feedback

## Browser Compatibility

The website is designed to be compatible with:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Performance Optimization

To maintain optimal website performance:

1. **Images**: 
   - Compress all images using tools like [TinyPNG](https://tinypng.com/)
   - Use appropriate image dimensions (avoid oversized images)
   - Implement lazy loading for images below the fold

2. **JavaScript**:
   - Minimize JavaScript execution in critical rendering path
   - Use event delegation for multiple similar elements
   - Avoid heavy libraries when vanilla JS will suffice

3. **CSS**:
   - Keep CSS files organized and minimized
   - Use efficient selectors
   - Group media queries for better maintainability

## Roadmap

Future development plans include:

1. **Integration of a Content Management System (CMS)** - Q2 2025
   - Allow non-technical staff to update content easily
   - Implement role-based access control

2. **Enhanced Donation System** - Q3 2025
   - Multiple payment gateway integration
   - Recurring donation options
   - Donation tracking and receipting

3. **Multilingual Support** - Q4 2025
   - Translation into major Ugandan languages
   - Region-specific content

4. **Community Forum** - Q1 2026
   - User accounts for supporters and beneficiaries
   - Discussion boards for community engagement
   - Volunteer coordination tools

## Contributing

We welcome contributions to improve the DaMaC Charity website! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and structure. Test thoroughly before submitting.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

DaMaC Charity Organization
- Email: danmagandazicharity@gmail.com
- Phone: +256 750 454 729
- Address: P.O BOX 175492, Kampala, Uganda

For website technical support, please contact the website administrator at [admin@damac.org](mailto:admin@damac.org).

---

"Inspiring Hope Through Sustainable Development"
