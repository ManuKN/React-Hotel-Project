import { useMutation } from "@tanstack/react-query"
import {signup as signupApi} from "../../services/apiAuth"
import toast from "react-hot-toast";

export function useSignup(){
const{mutate:signup , isLoading} = useMutation({
    mutationFn:signupApi,
    onSuccess:(user) =>{
      console.log(user);
      toast.success('Account is successfully created! please verify the email address from the users email address')
    }
})

    return {signup , isLoading}
}