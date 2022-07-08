import React, { FC } from 'react';
import { Button } from "@mui/material";
import { useService } from 'jokits-react';
import { Result } from '../services/Result.model';
import { apiCall } from '../utils/apicall';


interface InputProps {
    children: React.ReactElement | string;
    url: string;
    method: string;
    body?: object;
}

const ApiButton: FC<InputProps> = (props) => {

    const resService = useService("resultsService");

    function handleClick() {
        const fullUrl = `http://localhost:3000/${props.url}`;
        //CHANGE THIS TO USE APICALL

        async function requester() {

            const results = await apiCall(props.url, {
                method: props.method,
                body: props.body || undefined
            });
            if (results.ok) {
                const data = await results.json();

                const result: Result = {
                    method: props.method,
                    url: fullUrl,
                    ts: Date.now(),
                    results: JSON.stringify(data)
                }

                resService[1]("add", result);
            } else {

                console.error("Results not ok!", results);
                resService[1]("add", {
                    method: props.method,
                    url: fullUrl,
                    results: `FAIL: ${results.status}, ${results.type}, ${results.statusText}`,
                    fail: true

                });
            }
            

        }

        requester();
    }



    return (
        <Button variant="contained" onClick={handleClick}>
            <p><b>{props.children}</b> <br />
                <small>{props.method} : http://localhost:3000/{props.url}</small></p>

        </Button>
    )
}

export default ApiButton;