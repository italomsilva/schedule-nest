import { Notification } from '../../../../domain/entities/Notification';
import { DynamicNotification } from '../../../../domain/entities/DynamicNotification';
import { NotificationRepository } from 'src/@core/domain/repositories/NotificationRepository';

export class MySqlNotificationRepository implements NotificationRepository {
  constructor(private readonly repository: any) {}

  async findByUser(
    userId: string,
    page: number,
    isRead?: boolean,
  ): Promise<any[]> {
    let statement = `
      SELECT 
          \`notification\`.\`id\`,
          \`notification\`.\`is_read\`,
          \`notification\`.\`user_id\`,
          \`notification\`.\`dynamic_notification_id\`,
          \`notification\`.\`variables\`,
          \`notification\`.\`created_at\` AS \`notification_created_at\`,
          \`notification\`.\`updated_at\` AS \`notification_updated_at\`,
          \`dynamic_notification\`.\`title\`,
          \`dynamic_notification\`.\`subtitle\`,
          \`dynamic_notification\`.\`page\`
      FROM \`notification\`
      LEFT JOIN \`dynamic_notification\` ON \`notification\`.\`dynamic_notification_id\` = \`dynamic_notification\`.\`id\`
      WHERE \`notification\`.\`user_id\` = '${userId}'
      AND \`notification\`.\`deleted_at\` IS NULL
    `;

    if (isRead !== undefined) {
      statement += ` AND \`notification\`.\`is_read\` = ${isRead ? 'TRUE' : 'FALSE'}`;
    }

    statement += ` ORDER BY \`notification\`.\`created_at\` DESC LIMIT 20 OFFSET ${20 * page}`;

    const notifications = await this.repository.query(statement);

    return notifications;
  }

  async countUnread(userId: string): Promise<number> {
    let statement = `
      SELECT COUNT(*) AS count
      FROM notification
      WHERE user_id = '${userId}' AND is_read = FALSE
      AND deleted_at IS NULL
    `;

    const result = await this.repository.query(statement);
    const count = result[0].count;

    return count;
  }

  async markAsRead(notificationId: string): Promise<void> {
    let statement = `
      UPDATE notification
      SET is_read = TRUE
      WHERE id = '${notificationId}'
      AND deleted_at IS NULL
    `;

    await this.repository.query(statement);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    let statement = `
      SELECT *
      FROM notification
      WHERE id = '${notificationId}'
      AND deleted_at IS NULL
    `;

    const result = await this.repository.query(statement);

    if (result.length === 0) {
      return null;
    }

    return Notification.fromDatabase(result[0]);
  }

  async findDynamicByKey(keyName: string): Promise<DynamicNotification | null> {
    let statement = `
      SELECT *
      FROM dynamic_notification
      WHERE key_name = '${keyName}'
      AND deleted_at IS NULL
    `;

    const result = await this.repository.query(statement);

    if (result.length === 0) {
      return null;
    }

    return DynamicNotification.fromDatabase(result[0]);
  }

  async findUserById(userId: string): Promise<any | null> {
    let statement = `
      SELECT *
      FROM users
      WHERE id = '${userId}'
      AND deleted_at IS NULL
    `;

    const result = await this.repository.query(statement);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  async save(notification: Notification): Promise<Notification> {
    return this.repository.save(notification);
  }

  async deleteByUser(userId: string): Promise<void> {
    const queryString = `
      UPDATE notification
      SET deleted_at = NOW()
      WHERE user_id = '${userId}'
      AND deleted_at IS NULL
    `;
    await this.repository.query(queryString);
  }
}
