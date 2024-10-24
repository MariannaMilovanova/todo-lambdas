import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import crypto from 'crypto';
import { docClient, TODOS_TABLE } from '../../lib/dynamodb.js';
import { formatResponse } from '../../lib/response.js';
import { inputSchema } from './schema.js';

const createTodo = async (event) => {
  const { title } = event.body;
  const newTodo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  await docClient.send(
    new PutCommand({
      TableName: TODOS_TABLE,
      Item: newTodo
    })
  );
  
  return formatResponse(201, newTodo);
};

export const handler = middy(createTodo)
  .use(httpJsonBodyParser())
  .use(validator({ inputSchema }))
  .use(httpErrorHandler());