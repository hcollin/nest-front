import { Socket } from "socket.io-client";
import { Result } from "../services/Result.model";

interface ApiOptions {
    method: string;
    body?: object;
}

let jwt: null | string = null;

export async function apiCall(url: string, options?: ApiOptions): Promise<Response> {

    const apiOpts = Object.assign({}, {
        method: "GET",
    }, options);

    const fullUrl = `http://localhost:3000/${url}`;

    async function requester() {

        const opts: Partial<RequestInit> = {
            method: apiOpts.method,
            headers: {
                "Content-Type": "application/json",

            }
        };
        if (apiOpts.body) {
            opts.body = JSON.stringify(apiOpts.body);
        }
        if (jwt) {
            opts.headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            };

        }
        const results = await fetch(fullUrl, opts);
        return results;

    }

    return requester();
}


export function setAuthToken(at: string | null) {
    jwt = at;
}


export async function socketRequest<T>(socket: Socket, eventKey: string, data?: any): Promise<T> {
    return new Promise((resolve) => {
        socket.once(`${eventKey}-response`, (responseData: T) => {
            resolve(responseData);
        });

        if (data) { 
            socket.emit(eventKey, data); 
        } else { 
            socket.emit(eventKey); 
        }

    })

}