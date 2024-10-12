import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import Services from './pages/Services';
import './App.css'; // Ensure to add styling for the layout

// Main Dashboard Component
const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="content-area">
        {/* Conditionally render sub-navbars based on current route */}
        <div className="subnav-area">
          {location.pathname.startsWith('/dashboard/services/social_media') && <SocialMediaSubNav />}
          {location.pathname.startsWith('/dashboard/services/human_resource') && <HumanResourceSubNav />}
          {location.pathname.startsWith('/dashboard/services') && !(location.pathname.startsWith('/dashboard/services/social_media') || location.pathname.startsWith('/dashboard/services/human_resource')) && <ServicesSubNav />}
          {location.pathname.startsWith('/dashboard/profile') && <ProfileSubNav />}
        </div>
        
        <section className="content-section">
          <Outlet /> {/* Render child routes here */}
        </section>
      </div>
    </div>
  );
};

// Main Sidebar Navbar
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={() => navigate(-1)} className="back-button">
            Back
          </button>
        </li>
        <li>
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/services" className={({ isActive }) => (isActive ? 'active' : '')}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// Services SubNavbar
const ServicesSubNav = () => (
  <nav className="subnav">
    <ul>
      <li>
        <NavLink to="/dashboard/services/social_media" className={({ isActive }) => (isActive ? 'active' : '')}>
          Social Media
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/services/human_resource" className={({ isActive }) => (isActive ? 'active' : '')}>
          Human Resource
        </NavLink>
      </li>
    </ul>
  </nav>
);

// Social Media SubNavbar
const SocialMediaSubNav = () => (
  <nav className="subnav">
    <ul>
      <li>
        <NavLink to="/dashboard/services/social_media/content_strategy" className={({ isActive }) => (isActive ? 'active' : '')}>
          Content Strategy
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/services/social_media/post_and_reel_creation" className={({ isActive }) => (isActive ? 'active' : '')}>
          Post And Reel Creation
        </NavLink>
      </li>
    </ul>
  </nav>
);

// Human Resource SubNavbar
const HumanResourceSubNav = () => (
  <nav className="subnav">
    <ul>
      <li>
        <NavLink to="/dashboard/services/human_resource/payroll" className={({ isActive }) => (isActive ? 'active' : '')}>
          Payroll
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/services/human_resource/attendance_sheet" className={({ isActive }) => (isActive ? 'active' : '')}>
          Attendance Sheet
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/services/human_resource/police_verification" className={({ isActive }) => (isActive ? 'active' : '')}>
          Police Verification
        </NavLink>
      </li>
    </ul>
  </nav>
);

// Profile SubNavbar
const ProfileSubNav = () => (
  <nav className="subnav">
    <ul>
      <li>
        <NavLink to="/dashboard/profile/registration_documents" className={({ isActive }) => (isActive ? 'active' : '')}>
          Registration Documents
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile/docs_stats" className={({ isActive }) => (isActive ? 'active' : '')}>
          Documents Stats
        </NavLink>
      </li>
    </ul>
  </nav>
);

// Define the router structure
const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      // Redirect to services by default
      { path: '', element: <Navigate to="/dashboard/services" /> },
      {
        path: 'services',
        element: (
          <section>
            <h1>Services</h1>
            <Outlet />
          </section>
        ),
        children: [
          {
            path: 'social_media',
            element: (
              <section>
                <h1>Social Media</h1>
                <Outlet />
              </section>
            ),
            children: [
              { path: 'content_strategy', element: <h1>Content Strategy</h1> },
              { path: 'post_and_reel_creation', element: <h1>Post and Reel Creation</h1> }
            ]
          },
          {
            path: 'human_resource',
            element: (
              <section>
                <h1>Human Resource</h1>
                <Outlet />
              </section>
            ),
            children: [
              { path: 'payroll', element: <h1>Payroll</h1> },
              { path: 'attendance_sheet', element: <h1>Attendance Sheet</h1> },
              { path: 'police_verification', element: <h1>Police Verification</h1> }
            ]
          }
        ]
      },
      {
        path: 'profile',
        element: (
          <section>
            <h1>Profile</h1>
            <Outlet />
          </section>
        ),
        children: [
          { path: 'registration_documents', element: <h1>Registration Documents</h1> },
          { path: 'docs_stats', element: <h1>Document Stats</h1> }
        ]
      }
    ]
  }
]);

// Main App component with RouterProvider
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
