// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               v3.20.3
// source: proto/messaging.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "messaging";

export interface Message {
  messageId: string;
  conversationId: string;
  content: string;
  userId: string;
}

export interface Conversation {
  conversationId: string;
  messages: Message[];
  userIds: string[];
}

export interface User {
  userId: string;
  name: string;
  conversationsIds: string[];
}

export interface Empty {
}

export interface CreateConversationRequest {
  userIds: string[];
}

export interface Conversations {
  conversations: Conversation[];
}

export interface Users {
  users: User[];
}

export interface CreateConversationResponse {
  conversation: Conversation | undefined;
}

export interface QueryMessagesRequest {
  conversationId: string;
}

export const MESSAGING_PACKAGE_NAME = "messaging";

export interface MessagingServiceClient {
  sendMessage(request: Message): Observable<Empty>;

  queryMessages(request: QueryMessagesRequest): Observable<Message>;

  createUser(request: User): Observable<User>;

  createConversation(request: CreateConversationRequest): Observable<Conversation>;

  getConversation(request: Empty): Observable<Conversations>;

  getUsers(request: Empty): Observable<Users>;
}

export interface MessagingServiceController {
  sendMessage(request: Message): Promise<Empty> | Observable<Empty> | Empty;

  queryMessages(request: QueryMessagesRequest): Observable<Message>;

  createUser(request: User): Promise<User> | Observable<User> | User;

  createConversation(
    request: CreateConversationRequest,
  ): Promise<Conversation> | Observable<Conversation> | Conversation;

  getConversation(request: Empty): Promise<Conversations> | Observable<Conversations> | Conversations;

  getUsers(request: Empty): Promise<Users> | Observable<Users> | Users;
}

export function MessagingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "sendMessage",
      "queryMessages",
      "createUser",
      "createConversation",
      "getConversation",
      "getUsers",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MessagingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MessagingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MESSAGING_SERVICE_NAME = "MessagingService";
