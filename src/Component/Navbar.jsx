import {Navbar as HeroUiNavbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { counterContext } from "../contexts/CounterContext";
import { authContext } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";


export default function Navbar() {
  // const isLoggedIn=localStorage.getItem("token") !=null
  function handleSignUpButton(){
    navigate("/register")
  }
    function handleLoginButton(){
    navigate("/login")
  }
  const navigate=useNavigate();
  const {counter} = useContext(counterContext )
  console.log({counter});
  const{isLoggedIn,setIsLoggedIn}=useContext(authContext)
  
  function logOut(){
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    
    navigate("/login")

  }
  return (
    <div>
      <HeroUiNavbar >
      <NavbarBrand>
        
        <Link to={"/"} className="font-bold text-inherit">Circle </Link>
      </NavbarBrand>

      <NavbarContent justify="center"> 
        <NavbarItem>
              <Link to={"/profile"} className="font-bold text-inherit">Profile </Link>
            </NavbarItem>
       </NavbarContent>
       <NavbarContent justify="end"> 
        {
          isLoggedIn? 
              <NavbarItem>
              <Button onPress={logOut} color="danger" variant="flat">
                Sign out
              </Button>
            </NavbarItem>:
            <>
            <NavbarItem className="flex">
            <Button onPress={handleLoginButton} color="default" variant="flat">
              login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button onPress={handleSignUpButton} color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
            </>
        }

       
      </NavbarContent>
    </HeroUiNavbar>
    </div>
  )
}
