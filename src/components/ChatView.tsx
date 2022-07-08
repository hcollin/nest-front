import { Box, Button, Card, TextField } from "@mui/material"
import { trace } from "console";
import { JokiEvent } from "jokits";
import { joki, useService } from "jokits-react";
import { FC, useEffect, useState } from "react";
import { ChatMessage } from "../services/chat.models";



const useChatChannel = (channelId: string, name: string): [ChatMessage[], (msg: string) => void] => {

    const [chatService, trigger] = useService("chatService");
    const [msgs, setMsgs] = useState<ChatMessage[]>([]);



    useEffect(() => {
        trigger("join", { channelId: channelId, name: name });
        return joki.on({
            from: "chatService",
            action: `chat-update-${channelId}`,
            fn: (e: JokiEvent) => {
                setMsgs(e.data);

            }
        })

    }, [channelId]);

    useEffect(() => {
        if (chatService) {
            console.log("ChatServiceUpdated", chatService);



        }
    }, [chatService])

    function sendMsg(msgTxt: string) {
        const chatMsg = {
            message: msgTxt,
            sender: name,
            ts: Date.now(),
        };
        trigger("send", {
            channelId: channelId,
            msg: chatMsg
        });
    }


    return [
        msgs,
        sendMsg
    ];
}

interface InputProps {
    channelId: string;
    channelName: string;
    userName: string;
}


const ChatView:FC<InputProps> = (props) => {

    const [msgTxt, setMsgTxt] = useState<string>("");

    const [channelId, setChannelId] = useState<string>(props.channelId);

    const [msgs, send] = useChatChannel(channelId, props.userName);

    function handleMsgTxt(e: React.ChangeEvent<HTMLInputElement>) {
        setMsgTxt(e.target.value);
    }

    function sendMessage() {
        send(msgTxt);
        setMsgTxt("");
    }

    return (
        <Card sx={{ marginTop: "1rem" }}>
            <h2>Chat: {props.channelName}</h2>

            <Box>
                <TextField id="new-chat-msg" label="Message" variant="outlined" value={msgTxt} onChange={handleMsgTxt} />
                <Button variant="contained" onClick={sendMessage}>Send Message</Button>
            </Box>
            <hr />

            {msgs.map((msg: ChatMessage, i: number) => {
                return (
                    <p key={`cm${i}`}><b>{msg.sender}: </b>{msg.message}</p>
                )
            })}

        </Card>
    )
}

export default ChatView;