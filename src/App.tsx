import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import HomePage from './core/public/pages/home';
import LoginPetSitter from './core/public/pages/login_petsitter';
import OwnerLogin from './core/public/pages/login_petowner';
import RegisterPage from './core/public/pages/register_petowner';
import Dashboard from './core/public/pages/ownerdashboard';
import PetSitterDashboard from './core/public/pages/sitterdashboard';
import SitterRegister from './core/public/pages/register_petsitter';
import SitterDetails from './core/public/pages/SitterDetails';
import MyBookings from './core/public/pages/mybookings';
import OwnerBookings from './core/public/pages/ownerbookings';


// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/loginowner',
    element: <OwnerLogin />,
  },
  {
    path: '/loginsitter',
    element: <LoginPetSitter />,
  },
  {
    path: '/ownerdashboard',
    element: <Dashboard />,
  },
  {
    path: '/ownerregister',
    element: <RegisterPage />,
  },
  {
    path: '/sitterregister',
    element: <SitterRegister />,
  },
  {
    path: '/sitterdashboard',
    element: <PetSitterDashboard />,
  },
  {
    path: '/sitter-details/:id',
    element: <SitterDetails />,
  },
  {
    path: '/mybookings',
    element: <MyBookings />,
  },


  
]);

function App() {
  return (
    <>
      {/* Wrap the RouterProvider with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;