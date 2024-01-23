import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const FullPage = styled.div`
height:100vh;
background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;
`;
export default function ProtectedRoute({children}){

    const navigate = useNavigate()
    // 1.Load the authenticated user
   const{user , isLoading , isAuthenticated} = useUser()


    //2.If there is no authenticated user then redirect to dashboard
    useEffect(function(){
        if(!isAuthenticated && !isLoading) (navigate('/login'))
    } ,[isAuthenticated , isLoading , navigate])

    //3.while loading Show Spinner
   if(isLoading) 
   return (
   <FullPage>
      <Spinner />
   </FullPage>  
   )
   
    //4.if There is a user then render the app
    if(isAuthenticated) return children;
}