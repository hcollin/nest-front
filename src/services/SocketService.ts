import { JokiEvent, JokiService, JokiServiceApi } from "jokits";

import { io } from "socket.io-client";



export function createSocketService(sid: string, api: JokiServiceApi): JokiService<string> {

    let color: string = "red";




    const socket = io("ws://localhost:3000");


    socket.on("blip", (a: string) => {

        if (color !== a) {
            color = a;
            api.updated(color);
        }
    })


    function eventHandler(e: JokiEvent) {

    }


    function getState(): string {
        return color;
    }


    return {
        eventHandler,
        getState
    }

}