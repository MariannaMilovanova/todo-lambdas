export const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        completed: { type: 'boolean' }
      },
      required: ['completed']
    },
    pathParameters: {
      type: 'object',
      properties: {
        id: { type: 'string', pattern: '^[0-9a-fA-F-]{36}$' }
      },
      required: ['id']
    }
  }
};