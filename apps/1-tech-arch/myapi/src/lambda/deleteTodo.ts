import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import TodoService from '../services/todoService';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const todoService = new TodoService();
  await todoService.deleteTodoById(id);

  return {
    statusCode: 200,
    body: '',
  };
};
