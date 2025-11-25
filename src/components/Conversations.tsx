import React from "react";

import { BaseConversation } from "../types";
import ConversationView from "../views/Conversation";
import ConversationDataRaw from '../data/conversations/ExampleConversation.json';

const ConversationData = ConversationDataRaw as  BaseConversation;

export default function Conversations(){
    return(
        <div>
            <ConversationView conversation={ConversationData}/>
        </div>
    )
}