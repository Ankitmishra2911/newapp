import './App.css';
import Navbar from './compontents/Navbar';
import Login from './compontents/Login';
import Card from './compontents/Card';
import Home from './Home';
import Signup from './compontents/Signup';
import SingleItem from './compontents/SingleItem';
import {
BrowserRouter as Router,createBrowserRouter,
Routes,Route, RouterProvider,Link,useLoaderData
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import ChatPage from './compontents/ChatPage';
import {AdminDashboard} from './Dashboard/AdminDashboard';
import { UploadItem } from './Dashboard/UploadItem';
import { EditItems } from './Dashboard/EditItems';
import { ManageItems } from './Dashboard/ManageItems';
import Dashboard from './Dashboard/Dashboard';
import SellItem from './compontents/SellItem';
 const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    
  },
  {
    path: "/login",
    element: <Login />,
    
  },
  {
    path: "/createUser",
    element: <Signup/>,
    
  },
  {
    path: "/new",
    element: <Card/>,
  },
  {
    path: "/categories",    
  },
  {
    path: "/category/:itemid",
    element: <SingleItem/>,
    loader: ({params})=>
      fetch(`http://localhost:4000/api/category/${params.itemid}`)
  },
  {
    path: "/sell",
    element:<SellItem/>
  },
  {
         path:"/chat/:chatId",
         element:<ChatPage userId='buyer123'/>,
         loader: ({params})=>
      fetch(`http://localhost:4000/api/chat/${params.chatId}`)
  },
  {
    path:"/admin/dasboard",
    element:<AdminDashboard/>,
    children:[
      {
        path:"/admin/dasboard",
        element:<Dashboard/>,
      },
      {
        path:"/admin/dasboard/upload",
        element:<UploadItem/>
      },
      {
        path:"/admin/dasboard/manage",
        element:<ManageItems/>
      },
      {
        path:"/admin/dasboard/edit/:itemid",
        element:<EditItems/>,
        loader: ({params})=>
      fetch(`http://localhost:4000/api/admin/${params.itemid}`)
      }
    ]
  }
  
]);
function App() {
  return (
    <RouterProvider router={router} />
    
  );
}

export default App;
