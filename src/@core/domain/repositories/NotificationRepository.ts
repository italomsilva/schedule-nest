import { DynamicNotification } from "../entities/DynamicNotification";
import { Notification } from "../entities/Notification";

export interface NotificationRepository {
  findByUser(userId: string, page: number, isRead?: boolean): Promise<any[]>;
  countUnread(userId: string): Promise<number>;
  markAsRead(notificationId: string): Promise<void>;
  findById(notificationId: string): Promise<Notification | null>;
  findDynamicByKey(keyName: string): Promise<DynamicNotification | null>;
  findUserById(userId: string): Promise<any | null>;
  save(notification: Notification): Promise<Notification>;
  deleteByUser(userId: string): Promise<void>;
}
