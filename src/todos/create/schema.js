export const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 }
      },
      required: ['title']
    }
  }
};