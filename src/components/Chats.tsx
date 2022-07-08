import { TabPanelUnstyled } from "@mui/base";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useService } from "jokits-react";
import React, { useEffect, useState } from "react";
import { ChatChannel } from "../services/chat.models";
import ChatView from "./ChatView"
import TabPanel from "./TabPanel";



const Chats = () => {

    const [channels, setChannels] = useState<[string, string][]>([]);
    const [chatservice] = useService<Map<string, ChatChannel>>("chatService");
    const [channelId, setChannelId] = useState<string>("GENERALPUBLIC");

    useEffect(() => {
        const nchannelList: [string, string][] = [];

        chatservice?.forEach((c: ChatChannel) => {
            nchannelList.push([c.id, c.name]);
        });
        setChannels(nchannelList);

    }, [chatservice]);

    function tabChange(e: React.SyntheticEvent, newValue: string) {
        console.log("Change",  e, newValue);
        setChannelId(newValue);
    }

    return (

        <Box>
            <Tabs value={channelId} onChange={tabChange}>
                {channels.map(([id, name]: [string, string]) => {
                  
                  return (
                    <Tab label={name} value={id} key={id}/>
                  )
                })}

            </Tabs>

            
            {channels.map(([id, name]: [string, string]) => {

                return (
                    <TabPanel index={id} value={channelId} key={id}>
                        <ChatView channelId={id} userName="HC" channelName={name}/>
                    </TabPanel>
                )
            })}

            {/* <ChatView channelId={channelId} userName="HC" /> */}

        </Box>

        
    )
    
}



export default Chats;
