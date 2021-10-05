import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import TodoService from '../services/todoService';
import { TodoItem } from '../models/TodoItem';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const todoService = new TodoService();
  const todo: Partial<TodoItem> = { ...JSON.parse(event.body), id };

  const todoUpdated = await todoService.updateTodo(todo);

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: todoUpdated,
    }),
  };
};
