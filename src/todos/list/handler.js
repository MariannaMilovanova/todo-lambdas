import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TODOS_TABLE } from '../../lib/dynamodb.js';
import { formatResponse } from '../../lib/response.js';

const listTodos = async () => {
  const { Items: todos } = await docClient.send(
    new ScanCommand({ TableName: TODOS_TABLE })
  );
  return formatResponse(200, todos);
};

export const handler = middy(listTodos)
  .use(httpErrorHandler());