import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TODOS_TABLE } from '../../lib/dynamodb.js';
import { formatResponse } from '../../lib/response.js';
import { inputSchema } from './schema.js';

const deleteTodo = async (event) => {
  const { id } = event.pathParameters;
  
  await docClient.send(
    new DeleteCommand({
      TableName: TODOS_TABLE,
      Key: { id }
    })
  );
  
  return formatResponse(204, null);
};

export const handler = middy(deleteTodo)
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());