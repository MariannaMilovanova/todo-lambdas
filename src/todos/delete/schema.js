export const inputSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: '^[0-9a-fA-F-]{36}$' }
      },
      required: ['id']
    }
  }
};