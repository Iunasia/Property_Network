import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Buyer
import BuyerHome from './pages/buyer/Home'
import BuyerListingDetail from './pages/buyer/ListingDetail'
import SavedListings from './pages/buyer/SavedListings'
import Compare from './pages/buyer/Compare'
import BuyerAppointments from './pages/buyer/Appointments'
import BuyerMessages from './pages/buyer/Messages'
import Notifications from './pages/buyer/Notifications'
import BuyerProfile from './pages/buyer/Profile'

// Agent
import AgentDashboard from './pages/agent/Dashboard'
import ManageListings from './pages/agent/ManageListings'
import CreateListing from './pages/agent/CreateListing'
import EditListing from './pages/agent/EditListing'
import AgentListingDetail from './pages/agent/ListingDetail'
import AgentAppointments from './pages/agent/Appointments'
import AgentMessages from './pages/agent/Messages'
import AgentProfile from './pages/agent/Profile'

// Admin
import AdminDashboard from './pages/admin/Dashboard'
import ManageUsers from './pages/admin/ManageUsers'
import AdminManageListings from './pages/admin/ManageListings'
import ManageReports from './pages/admin/ManageReports'

// Shared
import NotFound from './pages/NotFound'
import Layout from './components/layout/Layout'
import DashboardLayout from './components/layout/DashboardLayout'
import PublicHome from './pages/PublicHome'

const BuyerLayout = () => {
  const links = [
    { to: '/buyer', label: 'Search Listings', end: true },
    { to: '/buyer/saved', label: 'Saved Properties' },
    { to: '/buyer/compare', label: 'Compare' },
    { to: '/buyer/appointments', label: 'Appointments' },
    { to: '/buyer/messages', label: 'Messages' },
    { to: '/buyer/profile', label: 'My Profile' }
  ];
  return <DashboardLayout role="buyer" links={links} />;
}

const AgentLayout = () => {
  const links = [
    { to: '/agent', label: 'Dashboard', end: true },
    { to: '/agent/listings', label: 'Manage Listings' },
    { to: '/agent/appointments', label: 'Appointments' },
    { to: '/agent/messages', label: 'Messages' },
    { to: '/agent/profile', label: 'Profile' }
  ];
  return <DashboardLayout role="agent" links={links} />;
}

const AdminLayout = () => {
  const links = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/users', label: 'Manage Users' },
    { to: '/admin/listings', label: 'Manage Listings' },
    { to: '/admin/reports', label: 'Manage Reports' }
  ];
  return <DashboardLayout role="admin" links={links} />;
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/login" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Buyer */}
        <Route path="/buyer" element={<ProtectedRoute allowedRoles={['buyer']}><Layout /></ProtectedRoute>}>
          <Route element={<BuyerLayout />}>
            <Route index element={<BuyerHome />} />
            <Route path="saved" element={<SavedListings />} />
            <Route path="compare" element={<Compare />} />
            <Route path="appointments" element={<BuyerAppointments />} />
            <Route path="messages" element={<BuyerMessages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<BuyerProfile />} />
          </Route>
          {/* Listing detail pages look better full-width without the sidebar */}
          <Route path="listings/:id" element={<BuyerListingDetail />} />
        </Route>

        {/* Agent */}
        <Route path="/agent" element={<ProtectedRoute allowedRoles={['agent']}><Layout /></ProtectedRoute>}>
          <Route element={<AgentLayout />}>
            <Route index element={<AgentDashboard />} />
            <Route path="listings" element={<ManageListings />} />
            <Route path="appointments" element={<AgentAppointments />} />
            <Route path="messages" element={<AgentMessages />} />
            <Route path="profile" element={<AgentProfile />} />
          </Route>
          {/* Create/Edit/Detail look better full width */}
          <Route path="listings/create" element={<CreateListing />} />
          <Route path="listings/edit/:id" element={<EditListing />} />
          <Route path="listings/:id" element={<AgentListingDetail />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Layout /></ProtectedRoute>}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="listings" element={<AdminManageListings />} />
            <Route path="reports" element={<ManageReports />} />
          </Route>
        </Route>

        {/* Public Landing Page */}
        <Route element={<Layout />}>
          <Route path="/" element={<PublicHome />} />
        </Route>

        {/* Default */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App