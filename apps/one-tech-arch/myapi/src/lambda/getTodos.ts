import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import TodoService from '../services/todoService';

export const handler: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const todoService = new TodoService();
  const items = await todoService.getAllTodos();

  return {
    statusCode: 201,
    body: JSON.stringify({
      items,
    }),
  };
};
