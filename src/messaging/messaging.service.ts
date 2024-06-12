import { Injectable } from "@nestjs/common";
import { ulid } from 'ulid';
import { Observable, Subject } from "rxjs";
import {Conversation, CreateConversationRequest, Message, QueryMessagesRequest, User} from "../../proto/messaging";

@Injectable()
export class MessagingService {
    //got a list of users
    private readonly users: User[] = [];
    //got a list of conversations
    private readonly conversations: Conversation[] = [];
    //got a stream for each conversation. A stream is a way to send messages to a client in a real-time waym in this case the definition of Subject is that it is a stream that can be subscribed to and unsubscribed from.
    private readonly conversationStreams: Map<string, Subject<Message>> = new Map();

   /**
    * Creates a new user with a unique ID generated using ulid() and adds it to the users array.
    * @param request 
    */
    create_user(request: User) {
        const user: User = {
            userId: ulid(),
            name: request.name,
            conversationsIds: []
        };
        //adds the user to the list
        this.users.push(user);
    }

    /**
     *  Creates a new conversation with a unique ID generated using ulid() and adds it to the conversations array. 
     * It also initializes a new Subject<message> and adds it to the conversationStreams map with the conversation ID as the key.
     * @param request 
     */
    create_conversation(request: CreateConversationRequest) {
        const conversation: Conversation = {
            conversationId: ulid(),
            messages: [],
            userIds: request.userIds,
        };
        //adds the conversation to the list
        this.conversations.push(conversation);
        //creates a stream for the conversation
        this.conversationStreams.set(conversation.conversationId, new Subject<Message>());

    }

    get_users(): User[] {
        return this.users;
    }

    get_conversations(): Conversation[] {
        return this.conversations;
    }

    /**
     * dds a new message to the conversation with the provided conversation ID. 
     * If the conversation exists, it adds the message to the conversation's messages array and emits the message to the corresponding message stream.
     * @param request 
     */
    send_message(request: Message) {
        const conversation = this.conversations.find(c => c.conversationId === request.conversationId);
        //if the conversation exists
        if (conversation) {
            //adds the message to the conversation
            conversation.messages.push(request);
            // get by key the stream of the conversation
            const stream = this.conversationStreams.get(request.conversationId);
            if (stream) {
                //here next is used to send the message to the stream. And what next does is that it sends the message to the stream.
                stream.next(request);
            }
        }
    }
    /**
     * Retrieves the message stream for the given conversation ID. If the stream doesn't exist, it creates a new one and adds it to the conversationsStream map.
     * @param request 
     * @returns 
     */
    queryMessages(request: QueryMessagesRequest): Observable<Message> {
        //get by key the stream of the conversation
        let stream = this.conversationStreams.get(request.conversationId);
        //if the stream does not exist
        if (!stream) {
            //create a new stream
            stream = new Subject<Message>();
            this.conversationStreams.set(request.conversationId, stream);
        }
        return stream.asObservable();
    }
}