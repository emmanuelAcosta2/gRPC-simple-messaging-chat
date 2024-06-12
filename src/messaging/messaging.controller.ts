import { Controller } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import {MessagingService} from "./messaging.service";
import {
    Conversation, Conversations,
    CreateConversationRequest,
    Empty,
    Message,
    MessagingServiceController,
    MessagingServiceControllerMethods,
    QueryMessagesRequest, User, Users
} from "../../proto/messaging";

@Controller('messaging')
@MessagingServiceControllerMethods()
export class MessagingController implements MessagingServiceController {

    constructor(private readonly usersService: MessagingService) {}

    /**
     * Sends a message to a conversation
     * @param request 
     * @returns 
     */
    sendMessage(request: Message): Promise<Empty> | Observable<Empty> | Empty {
        this.usersService.send_message(request);
        return of({});
    }

    /**
     * Queries messages from a conversation
     * @param request 
     * @returns 
     */
    queryMessages(request: QueryMessagesRequest): Observable<Message> {
        return this.usersService.queryMessages(request);
    }

    /**
     * Creates a user
     * @param request 
     * @returns 
     */
    createUser(request: User): Promise<User> | Observable<User> | User {
        this.usersService.create_user(request);
        return of(request);
    }

    /**
     * Creates a conversation
     * @param request 
     * @returns 
     */
    createConversation(request: CreateConversationRequest): Promise<Conversation> | Observable<Conversation> | Conversation {
        this.usersService.create_conversation(request);
        const newConversation = this.usersService
            .get_conversations()
            .find(conv => conv.userIds.includes(request.userIds[0]));
        return of(newConversation);
    }

    /**
     * Retrieves all conversations
     * @returns 
     */
    getConversation(): Promise<Conversations> | Observable<Conversations> | Conversations {
        const allConversations = this.usersService.get_conversations();
        return of({ conversations: allConversations });
    }

    /**
     * Retrieves all users
     * @returns 
     */
    getUsers(): Promise<Users> | Observable<Users> | Users {
        const allUsers = this.usersService.get_users();
        return of({ users: allUsers });
    }

}
