import { Notification } from "@/types";

export const notifications: Notification[] = [
  {
    id: 1,
    date: new Date("2024-05-07T00:00:00.000Z"),
    description:
      "A new report has been issued by another admin. Please review it at your earliest convenience.",
    isRead: false,
    isIgnored: false,
  },
  {
    id: 2,
    date: new Date("2024-05-08T00:00:00.000Z"),
    description:
      "A new shipment has arrived. Please coordinate with the warehouse team for unloading and inventory.",
    isRead: false,
    isIgnored: false,
  },
  {
    id: 3,
    date: new Date("2024-05-10T00:00:00.000Z"),
    description:
      "Category [Electronics] is running out of stock. Please place an order to replenish inventory.",
    isRead: false,
    isIgnored: false,
  },
  {
    id: 4,
    date: new Date("2024-05-11T00:00:00.000Z"),
    description:
      "A new report has been issued by another admin. Please review it at your earliest convenience.",
    isRead: false,
    isIgnored: false,
  },
];
