import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import PrivateRoute from './PrivateRoute';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards
const Crypto = Loader(lazy(() => import('src/content/dashboards')));

// Applications
const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const Socials = Loader(lazy(() => import('src/content/applications/Socials')));
const Users = Loader(
  lazy(() => import('src/content/applications/Users/users'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const Pages = Loader(lazy(() => import('src/content/applications/Pages/view')));
const EditPages = Loader(
  lazy(() => import('src/content/applications/Pages/edit'))
);
const AddPage = Loader(
  lazy(() => import('src/content/applications/Pages/addNew'))
);

const Mail = Loader(lazy(() => import('src/content/applications/Mail/view')));
const EditMail = Loader(
  lazy(() => import('src/content/applications/Mail/edit'))
);
const ComposeMail = Loader(
  lazy(() => import('src/content/applications/Mail/addNew'))
);

const ActivationSettings = Loader(
  lazy(() => import('src/content/applications/Settings/activations'))
);
// const TransactionSettings = Loader(
//   lazy(() => import('src/content/applications/Settings/edit'))
// );
const AppSettings = Loader(
  lazy(() => import('src/content/applications/Settings/appSettings'))
);
const SocialSettings = Loader(
  lazy(() => import('src/content/applications/Settings/socialPackage'))
);

const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);
const Activation = Loader(
  lazy(() => import('src/content/applications/Activations'))
);
const Notifications = Loader(
  lazy(() => import('src/content/applications/Notifications'))
);

// Components
const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const Login = Loader(lazy(() => import('src/content/login')));

const createRoute = (
  path: string,
  element: JSX.Element,
  isPrivate = false
) => ({
  path,
  element: isPrivate ? <PrivateRoute element={element} /> : element
});

// Updated routes
const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      createRoute('/', <Crypto />, true),
      // createRoute('/', <Navigate to="crypto" replace />, true),
      createRoute('dashboard', <Crypto />, true),
      {
        path: 'dashboard',
        children: [
          createRoute('dashboard', <Navigate to="crypto" replace />, true),
          createRoute('messenger', <Messenger />, true)
        ]
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      createRoute('', <Navigate to="transactions" replace />, true),
      createRoute('transactions', <Transactions />, true),
      createRoute('users', <Users />, true),
      createRoute('activation', <Activation />, true),
      createRoute('subscription', <Socials />, true),
      createRoute('notification', <Notifications />, true),
      {
        path: 'profile',
        children: [
          createRoute('', <Navigate to="details" replace />, true),
          createRoute('details', <UserProfile />, true),
          createRoute('settings', <UserSettings />, true)
        ]
      },
      {
        path: 'pages',
        children: [
          createRoute('', <Pages />, true),
          createRoute('add-new', <AddPage />, true),
          createRoute('edit', <EditPages />, true)
        ]
      }
    ]
  },
  {
    path: 'settings',
    element: <SidebarLayout />,
    children: [
      createRoute('', <Navigate to="activation" replace />, true),
      createRoute('activation', <ActivationSettings />, true),
      // createRoute('transactions', <TransactionSettings />, true),
      createRoute('socials', <SocialSettings />, true)
    ]
  },
  {
    path: 'system',
    element: <SidebarLayout />,
    children: [
      createRoute('', <Navigate to="appSettings" replace />, true),
      createRoute('appSettings', <AppSettings />, true)
      // createRoute('transactions', <TransactionSettings />, true),
      // createRoute('socials', <SocialSettings />, true)
    ]
  },
  {
    path: 'mail',
    element: <SidebarLayout />,
    children: [
      createRoute('', <Mail />, true),
      createRoute('edit', <EditMail />, true),
      createRoute('compose', <ComposeMail />, true)
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      createRoute('', <Navigate to="buttons" replace />),
      createRoute('buttons', <Buttons />),
      createRoute('modals', <Modals />),
      createRoute('accordions', <Accordions />),
      createRoute('tabs', <Tabs />),
      createRoute('badges', <Badges />),
      createRoute('tooltips', <Tooltips />),
      createRoute('avatars', <Avatars />),
      createRoute('cards', <Cards />),
      createRoute('forms', <Forms />)
    ]
  },
  {
    path: '/auth',
    element: <BaseLayout />,
    children: [
      createRoute('', <Navigate to="login" replace />),
      createRoute('login', <Login />),
      createRoute('logout', <Crypto />) // You might want to handle this differently
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      createRoute('404', <Status404 />),
      createRoute('500', <Status500 />),
      createRoute('maintenance', <StatusMaintenance />),
      createRoute('coming-soon', <StatusComingSoon />),
      // Other routes here...
      createRoute('*', <Navigate to="404" replace />) // This should be at the end
    ]
  }
];

export default routes;
