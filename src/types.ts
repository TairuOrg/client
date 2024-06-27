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
  personal_id: string;
  email: string;
  name: string;
  phone_number: string;
  residence_location: string;
}

export type Revenue = {
  VE: { amount: string };
  US: { amount: string };
  EU: { amount: string };
};
export type RevenueStats = {
  name: string;
  actual: number;
  "semana previa": number;
};

export type ItemsAndCategoriesCount = {
  items: number;
  categories: number;
};

export type CashiersStatusCount = {
  active_cashiers: number;
  inactive_cashiers: number;
};
export type ServerResponse<T> = {
  error: boolean;
  body: {
    message: string;
    payload: T;
  };
};

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
    userId?: number;
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

export type CashierStatus = {
  active: number;
  inactive: number;
  updateCashierStatus: () => Promise<void>;
};
export type Stock = {
  products: number;
  categories: number;
  updateStockStatus: () => void;
};

export type SummaryType = "cashier_stats" | "stock_stats";

export interface SummaryProps {
  type: SummaryType;
  data: CashierStatus | Stock;
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
  updateNotifications: () => Promise<void>;
  MarkAsRead: (id: number) => Promise<void>;
  MarkAsIgnored: () => Promise<void>;
}

// All the routes that are going to be used in the application, must be defined with this prefix to determine the role
export const PrefixRoutes = {
  ADMIN: "/admin",
  CASHIER: "/cashier",
} as const;

export type SignUpData = {
  personal_id: string;
  password: string;
  name: string;
  phone_number: string;
  email: string;
  residence_location: string;
  role: string;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
  updatePhoneNumber: (phone_number: string) => void;
  updateResidenceLocation: (residence_location: string) => void;
  updatePersonalId: (personal_id: string) => void;
};
export type Item = {
  id? : number | null
  barcode_id: string;
  category: string;
  manufacturer: string;
  name: string;
  price: string;
  quantity: number;
  renderedStatus?: JSX.Element;
  btnAction?: JSX.Element;
};

export type Cashier = {
  is_online: boolean;
  rendered_is_online?: JSX.Element;
  btnAction?: JSX.Element;
  User: {
    personal_id: string;
    name: string;
    phone_number: string;
    email: string;
    residence_location: string;
    is_deleted: boolean;
  };
};

export type EntryItem = {
  item_id: number | null;
  barcode_id: string;
  add_quantity: number;
  name: string;
  category: string;
  price: number;
  manufacturer: string;
};


export type Entry = {
  id?: number,
  admin_id: number,
  description: string,
  date: Date,
  entry_items: EntryItem[],
}