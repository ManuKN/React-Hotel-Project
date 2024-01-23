import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("manukn@example.com");
  const [password, setPassword] = useState("Manukn322");
  const{login , isLoading} = useLogin()

  function handleSubmit(e) {
   e.preventDefault();
   if(!email || !password) return
   console.log("data is Coming")
   login({email,password},{
    onSettled:() =>{
      setEmail('')
      setPassword('')
    }
   })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      
      <FormRow orientation="vertical">
        <Button size="large">{!isLoading ? "Login" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
