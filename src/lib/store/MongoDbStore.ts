import { MongoClient } from 'mongodb';

export class MongoDbStore {
  collection: any;
  database: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
  constructor({ hostname, port, username, password, database }: any) {
    this.hostname = hostname;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
  }

  async initialize() {
    const connectionString = `mongodb://${this.hostname}:${this.port}/`;
    const client = new MongoClient(connectionString);

    await client.connect();

    const database = client.db(this.database);
    const collection = database.collection('todos');

    this.collection = collection;
  }

  async noteTodo({ todo }: { todo: any }) {
    await this.collection.insertOne(todo);
  }

  async markTodoAsDone({ id }: { id: any }) {
    const modifiedCount = await this.collection.updateOne(
      { id },
      { $set: { status: 'done' } }
    );

    if (modifiedCount === 0) {
      throw new Error('Todo not found.');
    }
  }

  async getRemainingTodos() {
    return await this.collection
      .find({ status: 'open' }, { projection: { _id: 0 } })
      .toArray();
  }
}
