import { Button } from "@mui/material";
import { useState } from "react";
import { apiCall, setAuthToken } from "../utils/apicall";


const LoginButton = () => {

    const [jwt, setJwt] = useState<string | null>(null)

    function login() {
        async function call() {
            const res = await apiCall("auth/login", {
                method: "POST",
                body: { "username": "john", password: "changeme" }
            });
            console.log(res);
            if (res.ok) {
                const d = await res.json();
                console.log(d);
                if (d.access_token) {
                    setJwt(d.access_token);
                    setAuthToken(d.access_token);

                }
            }

        }

        call();
    }


    function logout() {

        setAuthToken(null);
        setJwt(null);


    }


    return (
        <Button variant="contained" color="info" onClick={jwt === null ? login : logout}>
            {jwt === null ? "Login" : "Logout"}
        </Button>
    )

}

export default LoginButton;