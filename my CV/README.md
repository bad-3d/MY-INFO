# Personal Portfolio Website

A modern, responsive personal portfolio website with bilingual support (Arabic/English) and admin management system.

## Features

### 🌐 Multilingual Support
- **Arabic Interface** (`index-ar.html`) - Right-to-left layout
- **English Interface** (`index-en.html`) - Left-to-right layout
- Seamless language switching

### 👤 User Authentication
- **User Registration** (`register.html`) - New user signup
- **User Login** (`login.html`) - Secure user authentication
- **Admin Login** (`admin-login.html`) - Administrative access
- Social login integration (Google & GitHub)

### 🛠️ Admin Dashboard
- **Admin Dashboard** (`admin-dashboard.html`) - Complete admin control panel
- **User Management** - View, edit, and manage user accounts
- **Profile Editor** (`profile-editor.html`) - Dynamic profile editing

### 🎨 Modern Design
- Responsive design for all devices
- Clean and professional UI
- Smooth animations and transitions
- Font Awesome icons integration
- Custom CSS styling for each language

## File Structure

```
├── index.html              # Main landing page
├── index-ar.html          # Arabic homepage
├── index-en.html          # English homepage
├── login.html             # User login page
├── register.html          # User registration page
├── admin-login.html       # Admin login page
├── admin-dashboard.html   # Admin control panel
├── profile-editor.html    # Profile editing interface
├── style.css              # Main stylesheet
├── style-ar.css           # Arabic-specific styles
├── style-en.css           # English-specific styles
├── auth-style.css         # Authentication pages styles
├── profile-editor-style.css # Profile editor styles
├── script.js              # Main JavaScript
├── script-ar.js           # Arabic-specific scripts
├── script-en.js           # English-specific scripts
├── auth-script.js         # Authentication scripts
├── admin-auth.js          # Admin authentication
├── profile-editor-script.js # Profile editor functionality
└── user-management.js     # User management functions
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript** - Interactive functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

## Getting Started

### Prerequisites
- A modern web browser
- Python 3.x (for local development server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Start a local development server:
```bash
python -m http.server 8000
```

3. Open your browser and navigate to:
- Main page: `http://localhost:8000`
- Arabic version: `http://localhost:8000/index-ar.html`
- English version: `http://localhost:8000/index-en.html`

## Usage

### For Visitors
1. Visit the homepage to view the portfolio
2. Switch between Arabic and English versions
3. Register for an account to access additional features
4. Login to manage your profile

### For Admins
1. Access the admin login page
2. Use admin credentials to access the dashboard
3. Manage users and content through the admin panel

## Features in Detail

### Authentication System
- Secure user registration and login
- Admin authentication with elevated privileges
- Social media login integration
- Session management

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Cross-browser compatibility
- Accessibility features

### Bilingual Support
- Complete Arabic localization with RTL support
- English interface with LTR layout
- Language-specific styling and scripts
- Cultural design considerations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- Font Awesome for the icon library
- Google Fonts for typography
- The open-source community for inspiration and resources