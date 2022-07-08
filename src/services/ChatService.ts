import { JokiEvent, JokiService, JokiServiceApi } from "jokits";

import { io } from "socket.io-client";
import { socketRequest } from "../utils/apicall";
import { ChatChannel, ChatMessage } from "./chat.models";


export function createChatService(sid: string, api: JokiServiceApi): JokiService<Map<string, ChatChannel>> {


    const channels: Map<string, ChatChannel> = new Map<string, ChatChannel>();

    const myChannels: Set<string> = new Set<string>();

    const socket = io("ws://localhost:3000");

    socket.on("chatChannelUpdate", (a: ChatChannel) => {
        
        if(myChannels.has(a.id)) {
            console.log(`Channel ${a.id} updated`);
            channels.set(a.id, a);
            
            api.api.trigger({
                action: `chat-update-${a.id}`,
                from: sid,
                data: a.messages
            });
        }
    });

    function eventHandler(e: JokiEvent) {
        if (e.to === sid) {
            switch (e.action) {
                case "send":
                    sendMessage(e.data.channelId, e.data.msg);
                    break;
                case "join":
                    joinChannel(e.data.channelId, e.data.name);
                    break;
                case "leave":
                    leaveChannel(e.data);
                    break;
                
                default:
                    break;

            }
        }
    }


    function joinChannel(channelId: string, name: string) {
        if(!myChannels.has(channelId)) {
            myChannels.add(channelId);
            socket.emit("chatJoin",  channelId, name);
            // api.updated(new Map(channels));
        }
    }

    function leaveChannel(channelId: string) {
        if(myChannels.has(channelId)) {
            myChannels.delete(channelId);
        }
    }

    function sendMessage(channelId: string, msg: ChatMessage) {
        socket.emit("chatMessage", channelId, msg);
    }


    function getState(): Map<string, ChatChannel> {
        return new Map(channels);
    }

    async function updateChannelList() {
        const results = await socketRequest<[string,string][]>(socket, "channelList");
        results.forEach(([cid, cname]) => {
            if(!channels.has(cid)) {
                channels.set(cid, {
                    id: cid,
                    name: cname,
                    messages: []
                });
            }
        });
        api.updated(getState());

    }


    updateChannelList();


    return {
        eventHandler,
        getState
    }

}