import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const NAVIGATION = [
  {
    kind: "header", // nav items header
    title: "Main items",
  },
  {
    segment: "", // route for home page
    title: "Home",
    icon: <HomeIcon />, // icon for home
  },
  {
    segment: "completed-todos", // route of completed todos
    title: "Completed Todos",
    icon: <DoneIcon />, // icon of completed todos
  },
  {
    segment: "pending-todos", // route of completed todos
    title: "Pending Todos",
    icon: <PendingActionsIcon />, // icon of completed todos
  },
  {
    segment: "about", // route for about
    title: "About",
    icon: <InfoIcon />, // icon for about app
  },
];

// creating a custom theme for the dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme", // specifies how color schemes are handled
  },
  colorSchemes: { light: true, dark: true }, // light dark toggle
  breakpoints: {
    values: {
      // responsive
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const location = useLocation(); // Hook to access the current location (path and query)

  // Creating a custom router object based on the current location and navigation
  const router = React.useMemo(() => {
    return {
      pathname: location.pathname, // Current route path
      searchParams: new URLSearchParams(location.search), // Query parameters
      navigate: (path) => navigate(path), // Function to handle navigation
    };
  }, [location, navigate]); // Dependencies: re-compute when location or navigate changes

  const LOGO_URL =
    "https://static-00.iconduck.com/assets.00/todo-icon-2048x2048-m7wp6prw.png";

  return (
    // AppProvider manages the theme, navigation, and branding for the app
    <AppProvider
      navigation={NAVIGATION} // Passing the navigation configuration to the AppProvider
      router={router} // Providing the router for navigation
      theme={demoTheme} // Applying the custom theme
      branding={{
        // Branding for the app: logo and title with gradient text
        logo: <img src={LOGO_URL} alt="Logo" />,
        title: (
          <span
            style={{
              background:
                "linear-gradient(90deg, rgba(118, 118, 255, 1) 22%, rgba(238, 130, 238, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            To-Do-List
          </span>
        ),
      }}
    >
      {/* Using DashboardLayout to wrap the main content */}
      <DashboardLayout>
        <Outlet /> {/* Renders the currently matched route's component */}
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
