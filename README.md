# CRM Lite

A minimal, modern Customer Relationship Management (CRM) dashboard built with React. CRM Lite provides an intuitive interface for managing client relationships, tracking key metrics, and monitoring compliance requirements.

## Features

### Core Functionality
- **Client Management**: View, search, and add clients with comprehensive contact information
- **Dashboard Analytics**: Real-time metrics including total clients, new additions, and Assets Under Management (AUM)
- **Compliance Monitoring**: Track KYC status and flagged clients for regulatory requirements
- **Activity Timeline**: Monitor recent client interactions and updates
- **Search & Filter**: Quick search across client names, emails, and phone numbers

### User Experience
- **Authentication System**: Secure login/logout with session persistence
- **Dark Mode**: Full dark theme support with user preference persistence
- **Responsive Design**: Mobile-friendly interface with collapsible navigation
- **Interactive Charts**: Visual data representation using Chart.js (pie and line charts)
- **Breadcrumb Navigation**: Easy navigation tracking across pages
- **Protected Routes**: Automatic authentication checks for secure pages

## Tech Stack

### Frontend Framework
- **React 19.1.0** - UI library
- **React Router 7.5.1** - Client-side routing
- **React Context API** - State management

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation
- **Dark Mode** - Class-based theming

### Data Visualization
- **Chart.js 4.4.9** - Charting library
- **react-chartjs-2 5.3.0** - React wrapper for Chart.js

### UI Components
- **react-icons 5.5.0** - Feather icon library

### Build Tools
- **Create React App 5.0.1** - React toolchain
- **gh-pages 6.3.0** - GitHub Pages deployment

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/seonglinchua/crm-lite.git
cd crm-lite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- **`npm start`** - Runs the app in development mode with hot reloading
- **`npm test`** - Launches the test runner in interactive watch mode
- **`npm run build`** - Builds the app for production to the `build` folder
- **`npm run deploy`** - Deploys the application to GitHub Pages

## Project Structure

```
crm-lite/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.js       # Top navigation bar with user menu
│   │   ├── Sidebar.js      # Collapsible navigation menu
│   │   ├── Footer.js       # Footer with links
│   │   ├── Layout.js       # Master layout wrapper
│   │   └── Breadcrumb.js   # Dynamic breadcrumb navigation
│   ├── pages/              # Page components (routes)
│   │   ├── LoginForm.js    # Authentication page
│   │   ├── Dashboard.js    # Main dashboard with metrics
│   │   ├── ClientList.js   # Clients table with search
│   │   ├── AddClient.js    # Add new client form
│   │   └── ViewClient.js   # Individual client details
│   ├── context/            # React Context providers
│   │   └── AuthContext.js  # Authentication state management
│   ├── App.js              # Main app with routing
│   ├── index.js            # React DOM entry point
│   └── index.css           # Global styles & Tailwind imports
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## Key Pages

### Dashboard
- **4 Key Metrics Cards**: Total Clients, New This Week, Total AUM, Client Types
- **Client Types Chart**: Pie chart showing distribution of client categories
- **AUM Growth Chart**: Line chart tracking asset growth over months
- **Recent Activity**: Timeline of latest client interactions
- **Compliance Alerts**: KYC and flagged client monitoring

### Client List
- Searchable table of all clients
- Quick actions: View details, Add new client
- Responsive table design

### Add Client
- Form validation for name, email, and phone
- Real-time field validation
- Success feedback on submission

### View Client
- Comprehensive client details
- Contact information
- Account status and metadata

## Authentication

The app includes a simple authentication system:
- Login required for all pages except the login form
- Session persistence using localStorage
- Automatic redirect to login for unauthenticated users
- Protected route wrapper for secure pages

**Note**: This is a prototype application using mock authentication. In production, implement proper backend authentication.

## Data Model

Currently uses mock data for demonstration purposes. The client data structure includes:
- Basic Info: Name, Email, Phone
- Account Status: Active/Inactive
- Metadata: Created date, Last updated
- Compliance: KYC status, Flags

## Deployment

The application is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch.

**Live Demo**: [https://seonglinchua.github.io/crm-lite](https://seonglinchua.github.io/crm-lite)

## Customization

### Themes
Toggle between light and dark modes using the theme switcher in the header. The preference is saved to localStorage.

### Tailwind Configuration
Modify `tailwind.config.js` to customize:
- Color schemes
- Typography
- Spacing
- Breakpoints

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- **No Backend**: This is a frontend-only application with mock data
- **Mock Authentication**: Login accepts any credentials for demo purposes
- **Client Data**: Hardcoded sample data (2 demo clients)
- **Charts**: Uses sample financial data for visualization

## Future Enhancements

Potential features for production deployment:
- Backend API integration (REST/GraphQL)
- Real authentication with JWT/OAuth
- Database integration for persistent storage
- Advanced filtering and sorting
- Export functionality (CSV/PDF)
- Email integration
- Calendar/meeting scheduler
- Document management
- Multi-user support with roles/permissions
- Real-time notifications

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Icons from [react-icons](https://react-icons.github.io/react-icons/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Built with React** | A minimal CRM dashboard for modern businesses
