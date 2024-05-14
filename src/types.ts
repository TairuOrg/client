// Definition of types used in the application
// Path: src/types.ts

// FormData is an interface that defines the structure of the form data that is going to be sent to the server for authentication.
export interface FormData {
  email: string;
  password: string;
}

// AuthData is an interface that defines the structure of the user data that is going to be sent to the server for authentication.
export interface AuthData {
  formData: FormData;
  isAdmin: boolean;
}
// User is an interface that defines the structure of the user data that is going to be stored in the application.
export interface User {
  id: number;
  email: string;
  fullname: string;
  isAdmin: boolean;
}

/*
Sample response from the server
{
  "error": false,
  "body": {
    "userId": "4",
    "message": {
      "title": "Admin login Successful",
      "description": "Welcome back",
      "notificationStatus": "success"
    }
  }
}
*/
export interface AuthResponse {
  error: boolean;
  body: {
    userId: number;
    message: {
      title: string;
      description: string;
      notificationStatus: NotificationStatus;
    };
  };
}
const NotificationStatus = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;

export type NotificationStatus =
  (typeof NotificationStatus)[keyof typeof NotificationStatus];

export interface AuthMessage {
  title: string;
  description: string;
  notificationStatus: NotificationStatus;
  duration?: 5000;
  isError: boolean;
}

export type Cashier = {
  active: number;
  inactive: number;
  updateCashierStatus: () => void;
};
export type Stock = {
  products: number;
  categories: number;
  updateStockStatus: () => void;
};

export type SummaryType = "cashier_stats" | "stock_stats";

export interface SummaryProps {
  type: SummaryType;
  data: Cashier | Stock;
  reloadContent: () => void;
}

export interface Notification {
  id: number;
  date: Date;
  description: string;
  isRead: boolean;
  isIgnored: boolean;
}
export interface NotificationStore {
  notifications: Notification[];
  updateNotifications:  () => Promise<void>;
  MarkAsRead: (id: number) => Promise<void>;
  MarkAsIgnored: () => Promise<void>;
}

// All the routes that are going to be used in the application, must be defined with this prefix to determine the role
export const PrefixRoutes = {
  ADMIN: "/admin",
  CASHIER: "/cashier",
} as const;
