import { create } from "zustand";
import { NotificationStore } from "@/types";
import { notifications as nt } from "@/dummy_data/notifications";

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  updateNotifications: () => {
    set({ notifications: nt });
  },
  MarkAsRead: (id: number) => {
    // Implementar lógica para marcar notificaciones como leídas
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    }));
    // Comunicar al servidor que la notificación ha sido leída
  },
  MarkAsIgnored: () => {
    // Implementar lógica para marcar notificaciones como ignoradas
    // todas aquellas notificaciones que estén marcadas como leídas
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.isRead ? { ...notification, isIgnored: true } : notification
      )
    }));
    // Comunicar al servidor que la notificación ha sido ignorada
  },
}));
