import { create } from "zustand";
import { NotificationStore } from "@/types";
import { notifications as nt } from "@/dummy_data/notifications";

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  updateNotifications: async () => { // Make function async
    // Simulate asynchronous data fetching
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 7000);
    });

    set({ notifications: nt });
  },
  MarkAsRead: async (id: number) => { // Make function async
    // Simulate asynchronous update
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    // Implement logic to mark notification as read
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    }));
    // Communicate with the server that the notification has been read
  },
  MarkAsIgnored: async () => { // Make function async
    // Simulate asynchronous update
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    // Implement logic to mark notifications as ignored
    // all those notifications that are marked as read
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.isRead ? { ...notification, isIgnored: true } : notification
      )
    }));
    // Communicate with the server that the notification has been ignored
  },
}));
