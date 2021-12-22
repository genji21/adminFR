import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import PrivateRoute from "./components/privateRoute";
import AuthPage from "./pages/Auth";
import { useCallback, useEffect } from 'react';
import { addUser, getinforUser } from './slice/userSlice';
import { useDispatch,useSelector } from "react-redux";

function App() {
  const dispath = useDispatch();
  const isLog = useSelector((state)=> state.user.isLog)
  const token = localStorage.getItem('accessToken')

   useEffect(()=>{
    const getInfor = async () =>{
    
   const action = getinforUser(token)
   const resultAction = await dispath(action)
    }
    if(token){
      getInfor()

    }

    
   },[isLog,token])
  return (
    <Router>
        <Switch>
          <Route exact path="/login" component={AuthPage} />  
           
          <PrivateRoute exact path="/" component={Home} >
            
          </PrivateRoute>


         <PrivateRoute path="/users" component={UserList}>


         </PrivateRoute>
          
            <PrivateRoute path="/user/:userId" component={User}>


         </PrivateRoute>
        
            <PrivateRoute path="/newUser" component={NewUser}>


         </PrivateRoute>
         <PrivateRoute path="/products" component={ProductList}>


         </PrivateRoute>
        <PrivateRoute path="/product/:productId" component={Product}>


         </PrivateRoute>
          <PrivateRoute path="/newproduct" component={NewProduct}>


         </PrivateRoute>
         
          
         
        </Switch>
    </Router>
  );
}

export default App;
