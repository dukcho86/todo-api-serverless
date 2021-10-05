import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { TodoItem } from '../TodoItem';

export default class TodoRepository {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todoTable = process.env.TODOS_TABLE
  ) {}

  async getAllTodos(): Promise<TodoItem[]> {
    const result = await this.docClient
      .scan({
        TableName: this.todoTable,
      })
      .promise();

    return result.Items as TodoItem[];
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient
      .put({
        TableName: this.todoTable,
        Item: todo,
      })
      .promise();

    return todo;
  }

  async updateTodo(partialTodo: Partial<TodoItem>): Promise<TodoItem> {
    const updated = await this.docClient
      .update({
        TableName: this.todoTable,
        Key: { id: partialTodo.id },
        UpdateExpression: 'set #name = :name, done = :done',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':name': partialTodo.name,
          ':done': partialTodo.done,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return updated.Attributes as TodoItem;
  }

  async deleteTodoById(id: string) {
    return this.docClient
      .delete({
        TableName: this.todoTable,
        Key: { id: id },
      })
      .promise();
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  }

  return new AWS.DynamoDB.DocumentClient();
}
