"use client";

import { useSyncExternalStore } from "react";

import {
  communityNotifications,
  communityRequests,
  demoUsers,
  type CommunityNotification,
  type CommunityRequest,
  type DemoRole,
  type DemoUser,
} from "./mock-community";
import type { AuthSession } from "./auth-session";

export type CommunityMessage = {
  id: string;
  from: string;
  to: string;
  text: string;
  time: string;
};

export type CommunityState = {
  users: DemoUser[];
  requests: CommunityRequest[];
  notifications: CommunityNotification[];
  messages: CommunityMessage[];
};

const STORAGE_KEYS = {
  users: "helplytics_users",
  requests: "helplytics_requests",
  notifications: "helplytics_notifications",
  messages: "helplytics_messages",
};

const COMMUNITY_EVENT = "helplytics-community-updated";

const DEFAULT_MESSAGES: CommunityMessage[] = [
  {
    id: "msg-1",
    from: "Ayesha Khan",
    to: "Sara Noor",
    text: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
    time: "09:45 AM",
  },
  {
    id: "msg-2",
    from: "Hassan Ali",
    to: "Ayesha Khan",
    text: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
    time: "11:10 AM",
  },
];

const CATEGORY_RULES: Record<string, string[]> = {
  "Web Development": [
    "website",
    "frontend",
    "javascript",
    "html",
    "css",
    "react",
    "bug",
    "responsive",
    "next",
  ],
  Design: ["design", "figma", "ui", "ux", "poster", "brand"],
  Career: ["resume", "career", "job", "interview", "linkedin", "portfolio"],
  Academics: ["math", "assignment", "physics", "chemistry", "study", "exam"],
  Content: ["writing", "content", "script", "copy", "blog"],
  Community: ["event", "volunteer", "community", "coordination", "mentor"],
};

const URGENCY_RULES = [
  {
    level: "Critical" as const,
    words: ["asap", "urgent", "deadline", "today"],
  },
  { level: "High" as const, words: ["soon", "issue", "blocked", "tomorrow"] },
  { level: "Medium" as const, words: ["guidance", "review", "feedback"] },
];

const SKILLS = [
  "JavaScript",
  "HTML/CSS",
  "React",
  "Node.js",
  "Python",
  "UI/UX",
  "Graphic Design",
  "Content Writing",
  "Public Speaking",
  "Data Analysis",
  "Math Tutoring",
  "Career Guidance",
  "Git/GitHub",
  "Figma",
  "Firebase",
  "Interview Prep",
  "Next.js",
  "Tailwind",
];

function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function parseStoredValue<T>(rawValue: string | null, fallback: T): T {
  if (!rawValue) {
    return deepCopy(fallback);
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return deepCopy(fallback);
  }
}

function writeLocalStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function ensureCommunitySeeded() {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.users)) {
    writeLocalStorage(STORAGE_KEYS.users, demoUsers);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.requests)) {
    writeLocalStorage(STORAGE_KEYS.requests, communityRequests);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.notifications)) {
    writeLocalStorage(STORAGE_KEYS.notifications, communityNotifications);
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.messages)) {
    writeLocalStorage(STORAGE_KEYS.messages, DEFAULT_MESSAGES);
  }
}

function emitCommunityUpdate() {
  if (typeof window === "undefined") {
    return;
  }
  
  window.dispatchEvent(new Event(COMMUNITY_EVENT));
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = () => onStoreChange();
  window.addEventListener(COMMUNITY_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(COMMUNITY_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

const emptyState: CommunityState = {
  users: deepCopy(demoUsers),
  requests: deepCopy(communityRequests),
  notifications: deepCopy(communityNotifications),
  messages: deepCopy(DEFAULT_MESSAGES),
};

const DEFAULT_USERS_RAW = JSON.stringify(demoUsers);
const DEFAULT_REQUESTS_RAW = JSON.stringify(communityRequests);
const DEFAULT_NOTIFICATIONS_RAW = JSON.stringify(communityNotifications);
const DEFAULT_MESSAGES_RAW = JSON.stringify(DEFAULT_MESSAGES);

let cachedSnapshotSignature = "";
let cachedSnapshot: CommunityState = emptyState;

function getServerSnapshot() {
  return emptyState;
}

export function readCommunityState(): CommunityState {
  if (typeof window === "undefined") {
    return emptyState;
  }

  ensureCommunitySeeded();

  const usersRaw =
    window.localStorage.getItem(STORAGE_KEYS.users) ?? DEFAULT_USERS_RAW;
  const requestsRaw =
    window.localStorage.getItem(STORAGE_KEYS.requests) ?? DEFAULT_REQUESTS_RAW;
  const notificationsRaw =
    window.localStorage.getItem(STORAGE_KEYS.notifications) ??
    DEFAULT_NOTIFICATIONS_RAW;
  const messagesRaw =
    window.localStorage.getItem(STORAGE_KEYS.messages) ?? DEFAULT_MESSAGES_RAW;

  const nextSignature = `${usersRaw}|${requestsRaw}|${notificationsRaw}|${messagesRaw}`;

  if (cachedSnapshotSignature === nextSignature) {
    return cachedSnapshot;
  }

  cachedSnapshot = {
    users: parseStoredValue(usersRaw, demoUsers),
    requests: parseStoredValue(requestsRaw, communityRequests),
    notifications: parseStoredValue(notificationsRaw, communityNotifications),
    messages: parseStoredValue(messagesRaw, DEFAULT_MESSAGES),
  };

  cachedSnapshotSignature = nextSignature;

  return cachedSnapshot;
}

function writeCommunityState(state: CommunityState) {
  writeLocalStorage(STORAGE_KEYS.users, state.users);
  writeLocalStorage(STORAGE_KEYS.requests, state.requests);
  writeLocalStorage(STORAGE_KEYS.notifications, state.notifications);
  writeLocalStorage(STORAGE_KEYS.messages, state.messages);
  emitCommunityUpdate();
}

export function useCommunityStore() {
  return useSyncExternalStore(subscribe, readCommunityState, getServerSnapshot);
}

export function getCurrentCommunityUser(
  state: CommunityState,
  session: AuthSession,
) {
  return (
    state.users.find((user) => user.email === session.email) ??
    state.users.find((user) => user.name === session.name) ??
    state.users[0]
  );
}

export function updateUserById(
  userId: string,
  updates: Partial<DemoUser>,
): DemoUser | undefined {
  const state = readCommunityState();
  const nextUsers = state.users.map((user) =>
    user.id === userId ? { ...user, ...updates } : user,
  );
  const updatedUser = nextUsers.find((user) => user.id === userId);

  writeCommunityState({ ...state, users: nextUsers });
  return updatedUser;
}

export function createUser(payload: {
  name: string;
  email: string;
  role: DemoRole;
  password?: string;
}) {
  const state = readCommunityState();
  const newUser: DemoUser = {
    id: makeId("user"),
    name: payload.name,
    email: payload.email,
    role: payload.role,
    location: "Remote",
    interests: ["Community Growth", "Peer Learning"],
    skills: [],
    trustScore: 70,
    badges: ["New Member"],
    contributions: 0,
  };

  writeCommunityState({
    ...state,
    users: [newUser, ...state.users],
  });

  return newUser;
}

export function markNotificationRead(notificationId: string) {
  const state = readCommunityState();
  const nextNotifications = state.notifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, status: "Read" as const }
      : notification,
  );

  writeCommunityState({ ...state, notifications: nextNotifications });
}

export function markAllNotificationsRead() {
  const state = readCommunityState();
  writeCommunityState({
    ...state,
    notifications: state.notifications.map((notification) => ({
      ...notification,
      status: "Read" as const,
    })),
  });
}

export function sendMessage(payload: {
  from: string;
  to: string;
  text: string;
}) {
  const state = readCommunityState();
  const newMessage: CommunityMessage = {
    id: makeId("msg"),
    from: payload.from,
    to: payload.to,
    text: payload.text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  writeCommunityState({
    ...state,
    messages: [newMessage, ...state.messages],
  });

  return newMessage;
}

export function updateCurrentUserProfile(
  session: AuthSession,
  updates: Partial<DemoUser>,
) {
  const state = readCommunityState();
  const currentUser = getCurrentCommunityUser(state, session);

  return updateUserById(currentUser.id, updates);
}

export function addHelperToRequest(requestId: string, helperId: string) {
  const state = readCommunityState();
  let wasAdded = false;

  const nextRequests = state.requests.map((request) => {
    if (request.id !== requestId || request.helperIds.includes(helperId)) {
      return request;
    }

    wasAdded = true;
    return {
      ...request,
      helperIds: [...request.helperIds, helperId],
    };
  });

  if (!wasAdded) {
    return false;
  }

  const helper = state.users.find((user) => user.id === helperId);
  const targetRequest = state.requests.find(
    (request) => request.id === requestId,
  );
  const nextNotifications = [
    {
      id: makeId("note"),
      title: `${helper?.name ?? "A helper"} offered help on "${targetRequest?.title ?? "your request"}"`,
      type: "Match",
      status: "Unread" as const,
      time: "Just now",
    },
    ...state.notifications,
  ];

  writeCommunityState({
    ...state,
    requests: nextRequests,
    notifications: nextNotifications,
  });

  return true;
}

export function markRequestSolved(requestId: string, actorId: string) {
  const state = readCommunityState();
  let solvedRequestTitle = "";

  const nextRequests = state.requests.map((request) => {
    if (request.id !== requestId) {
      return request;
    }

    solvedRequestTitle = request.title;
    return {
      ...request,
      status: "Solved" as const,
    };
  });

  const nextUsers = state.users.map((user) =>
    user.id === actorId
      ? {
          ...user,
          trustScore: Math.min(100, user.trustScore + 3),
          contributions: user.contributions + 1,
        }
      : user,
  );

  const nextNotifications = [
    {
      id: makeId("note"),
      title: `"${solvedRequestTitle}" was marked as solved`,
      type: "Status",
      status: "Unread" as const,
      time: "Just now",
    },
    ...state.notifications,
  ];

  writeCommunityState({
    users: nextUsers,
    requests: nextRequests,
    notifications: nextNotifications,
    messages: state.messages,
  });
}

export function createRequest(payload: {
  title: string;
  description: string;
  tags: string[];
  category: string;
  urgency: CommunityRequest["urgency"];
  requesterId: string;
  location: string;
}) {
  const state = readCommunityState();
  const newRequest: CommunityRequest = {
    id: makeId("req"),
    title: payload.title,
    description: payload.description,
    tags: payload.tags,
    category: payload.category,
    urgency: payload.urgency,
    location: payload.location,
    requesterId: payload.requesterId,
    helperIds: [],
    status: "Open",
    aiSummary: `AI summary: ${payload.category} request with ${payload.urgency.toLowerCase()} urgency. Best suited for members with ${payload.tags.join(", ") || "relevant"} expertise.`,
  };

  const nextNotifications = [
    {
      id: makeId("note"),
      title: `Your request "${newRequest.title}" is now live in the community feed`,
      type: "Request",
      status: "Unread" as const,
      time: "Just now",
    },
    ...state.notifications,
  ];

  writeCommunityState({
    ...state,
    requests: [newRequest, ...state.requests],
    notifications: nextNotifications,
  });

  return newRequest;
}

export function suggestCategory(text: string) {
  const normalized = text.toLowerCase();
  let bestCategory = "Community";
  let bestScore = 0;

  Object.entries(CATEGORY_RULES).forEach(([category, words]) => {
    const score = words.reduce(
      (total, word) => total + Number(normalized.includes(word)),
      0,
    );

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  });

  return bestCategory;
}

export function detectUrgency(text: string): CommunityRequest["urgency"] {
  const normalized = text.toLowerCase();

  for (const rule of URGENCY_RULES) {
    if (rule.words.some((word) => normalized.includes(word))) {
      return rule.level;
    }
  }

  return "Low";
}

export function suggestTags(text: string) {
  const normalized = text.toLowerCase();
  const tags = SKILLS.filter(
    (skill) =>
      normalized.includes(skill.toLowerCase()) ||
      normalized.includes(skill.toLowerCase().replace("/", "")),
  ).slice(0, 4);

  if (normalized.includes("portfolio")) {
    tags.push("Portfolio");
  }

  if (normalized.includes("responsive")) {
    tags.push("Responsive");
  }

  if (normalized.includes("interview")) {
    tags.push("Interview Prep");
  }

  if (normalized.includes("design")) {
    tags.push("Design Review");
  }

  return [...new Set(tags)].slice(0, 5);
}

export function rewriteDescription(text: string) {
  const trimmed = text.trim();

  if (!trimmed) {
    return "";
  }

  return `I need focused support with ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1)}. A helper who can provide practical next steps, examples, and a quick review would be ideal.`;
}

export function deriveSkillSuggestions(user: DemoUser) {
  const joined = [...user.interests, ...user.skills].join(" ").toLowerCase();
  const helpWith = SKILLS.filter(
    (item) =>
      joined.includes(item.toLowerCase()) ||
      item.split(" ").some((part) => joined.includes(part.toLowerCase())),
  ).slice(0, 4);

  const needHelp = SKILLS.filter(
    (item) => !user.skills.includes(item) && !helpWith.includes(item),
  ).slice(0, 4);

  return {
    helpWith: helpWith.length
      ? helpWith
      : ["UI/UX", "Career Guidance", "Public Speaking"],
    needHelp: needHelp.length
      ? needHelp
      : ["Git/GitHub", "Interview Prep", "React"],
  };
}

export function getTopCategory(requests: CommunityRequest[]) {
  const counts = requests.reduce<Record<string, number>>(
    (accumulator, request) => {
      accumulator[request.category] = (accumulator[request.category] ?? 0) + 1;
      return accumulator;
    },
    {},
  );

  return (
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Community"
  );
}
