export interface AuthData {
  isAdmin: boolean;
  email: string;
  password: string;
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
  updateNotifications: () => void;
  MarkAsRead: () => void;
  MarkAsIgnored: () => void;
}