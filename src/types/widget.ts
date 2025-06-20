import { Message } from "@ai-sdk/react";

export type Status = "maintenance" | "offline" | "online";

export type Position = "bottom-left" | "bottom-right";

export interface Brand {
  name: string;
  websiteUrl: string;
}

export interface Theme {
  assistantMessageBackground?: string;
  assistantMessageText?: string;
  border?: string;
  cardBackground?: string;
  footerBackground?: string;
  headerBackground?: string;
  primary?: string;
  primaryText?: string;
  statusMaintenance?: string;
  statusOffline?: string;
  statusOnline?: string;
  textMuted?: string;
  textPrimary?: string;
  textSecondary?: string;
  userMessageBackground?: string;
  userMessageText?: string;
}

export interface Chat {
  createdAt: Date;
  id: string;
  messages: Message[];
  title: string;
  updatedAt: Date;
}

export interface User {
  authenticatedAt: Date;
  name: string;
}

export type ActiveTab = "chat" | "history" | "maintanance" | "offline";
