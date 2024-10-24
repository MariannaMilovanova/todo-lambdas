import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TODOS_TABLE } from '../../lib/dynamodb.js';
import { formatResponse } from '../../lib/response.js';
import { inputSchema } from './schema.js';

const updateTodo = async (event) => {
  const { id } = event.pathParameters;
  const { completed } = event.body;
  
  const { Attributes: updatedTodo } = await docClient.send(
    new UpdateCommand({
      TableName: TODOS_TABLE,
      Key: { id },
      UpdateExpression: 'SET completed = :completed',
      ExpressionAttributeValues: {
        ':completed': completed
      },
      ReturnValues: 'ALL_NEW'
    })
  );
  
  return formatResponse(200, updatedTodo);
};

export const handler = middy(updateTodo)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());