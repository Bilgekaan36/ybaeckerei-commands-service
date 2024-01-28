import { dbMigrationQueries } from '../utils/databaseQueries';
import { Pool } from 'pg';
import { registrationMethods } from '../methods/mixins/registrationMethods';
import { editMethods } from '../methods/mixins/editMethods';
import { removeMethods } from '../methods/mixins/removeMethods';
import { ICheckoutOrder, IPayOrder } from 'lib/types/api';

const mixinMethods = registrationMethods(editMethods(removeMethods(class {})));

export class PostgresqlDbStore extends mixinMethods {
  pool: any;
  constructor({ host, port, user, password, database }: any) {
    const config = {
      user,
      host,
      database,
      password,
      port,
    };
    const pool = new Pool(config);
    super();
    this.pool = pool;
  }

  async initialize() {
    dbMigrationQueries(this.pool);
  }

  // Order Handling
  async checkoutOrder({ customerId, statusId, products }: ICheckoutOrder) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const order = await client.query(
        `INSERT INTO "Order" ("customerId", "statusId") VALUES ($1, $2) RETURNING "orderId"`,
        [customerId, statusId]
      );
      const orderId = order.rows[0].orderId;
      products.forEach(async (product: any) => {
        await client.query(
          `INSERT INTO "OrderItem" ("orderId", "productId", "quantity"", "subtotal") VALUES ($1, $2, $3, $4)`,
          [orderId, product.productId, product.quantity, product.subtotal]
        );
      });
      await client.query('COMMIT');
      return orderId;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async payOrder({ orderId }: IPayOrder) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        `UPDATE "Order" SET "isPaid" = true WHERE "orderId" = $1`,
        [orderId]
      );
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}
