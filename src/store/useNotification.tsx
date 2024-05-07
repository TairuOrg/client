import { create } from "zustand";
import { NotificationStore } from "@/types";
import { notifications as nt } from "@/dummy_data/notifications";

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  updateNotifications: () => {
    set({ notifications: nt });
  },
  MarkAsRead: () => {
    // Implementar lógica para marcar notificaciones como leídas
  },
  MarkAsIgnored: () => {
    // Implementar lógica para marcar notificaciones como ignoradas
  },
}));
