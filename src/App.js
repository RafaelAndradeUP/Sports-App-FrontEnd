import './App.css';
import { Switch, BrowserRouter, Route } from "react-router-dom"
import Home from "./pages/Home"
import Feed from "./pages/Feed"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ForgotPassword from "./pages/ForgotPassword"
import EditProfile from "./pages/EditProfile"
import Search from "./pages/Search"
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './PrivateRoute';

const App = () => {
  return(
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path='/' component={Home}/>
        <PrivateRoute exact path='/feed' component={Feed}/>
        <Route exact path='/register' component={Register}/>
        <PrivateRoute exact path='/my-profile/edit' component={EditProfile}/>
        <PrivateRoute exact path='/search/:searchCriteria' component={Search}/>
        <Route exact path='/forgot-password' component={ForgotPassword}/>
        <Route path='*' component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
