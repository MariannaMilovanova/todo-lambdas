import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  ...(process.env.IS_OFFLINE && {
    endpoint: "http://localhost:8000",
    region: "local",
    credentials: {
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET"
    }
  })
});

export const docClient = DynamoDBDocumentClient.from(client);
export const TODOS_TABLE = process.env.TODOS_TABLE;