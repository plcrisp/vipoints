import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'VIPoints',
    version: '1.0.0',
    description: 'Documentação da API do VIPoints com usuários, autenticação, recompensas e resgates',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'email', 'createdAt'],
      },
      UserUpdate: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          phone: { type: 'string' },
          cep: { type: 'string' },
          user_type: {
            type: 'string',
            enum: ['CLIENT', 'ADMIN'],
            default: 'CLIENT',
          },
          rank: { type: 'integer' },
        },
      },
      Reward: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          requiredPoints: { type: 'integer' },
          availableQuantity: { type: 'integer' },
        },
      },
      RewardRequest: {
        type: 'object',
        required: ['name', 'description', 'requiredPoints', 'availableQuantity'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          requiredPoints: { type: 'integer' },
          availableQuantity: { type: 'integer' },
        },
      },
      RewardRedemption: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          rewardId: { type: 'string' },
          quantity: { type: 'integer' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
          },
          reward: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
            },
          },
        },
      },
      RewardRedemptionRequest: {
        type: 'object',
        required: ['userId', 'rewardId', 'quantity'],
        properties: {
          userId: { type: 'string' },
          rewardId: { type: 'string' },
          quantity: { type: 'integer' },
        },
      },
    },
  },
  paths: {
    '/users': {
      get: {
        summary: 'Lista todos os usuários',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Retorna um usuário pelo ID',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Usuário encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      put: {
        summary: 'Atualiza os dados de um usuário',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserUpdate' },
            },
          },
        },
        responses: {
          200: {
            description: 'Usuário atualizado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          404: {
            description: 'Erro ao atualizar usuário',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Deleta um usuário',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          204: { description: 'Usuário deletado com sucesso' },
          404: {
            description: 'Erro ao deletar usuário',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Autentica o usuário',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login bem-sucedido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginResponse',
                },
              },
            },
          },
          401: {
            description: 'Credenciais inválidas',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          500: {
            description: 'Erro interno',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  '/auth/register': {
    post: {
      summary: 'Registra um novo usuário',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterRequest',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Usuário registrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                  userId: { type: 'string' },
                },
              },
            },
          },
        },
        400: {
          description: 'Email já cadastrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        500: {
          description: 'Erro interno',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },
    '/rewards': {
      get: {
        summary: 'Lista todas as recompensas',
        tags: ['Recompensas'],
        responses: {
          200: {
            description: 'Lista de recompensas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Reward' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cria uma nova recompensa',
        tags: ['Recompensas'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RewardRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Recompensa criada com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Reward' },
              },
            },
          },
        },
      },
    },
    '/rewards/{id}': {
      get: {
        summary: 'Busca uma recompensa pelo ID',
        tags: ['Recompensas'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Recompensa encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Reward' },
              },
            },
          },
          404: {
            description: 'Recompensa não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      put: {
        summary: 'Atualiza uma recompensa existente',
        tags: ['Recompensas'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RewardRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Recompensa atualizada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Reward' },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Deleta uma recompensa',
        tags: ['Recompensas'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          204: {
            description: 'Recompensa deletada com sucesso',
          },
        },
      },
    },
    '/reward-redemptions': {
      get: {
        summary: 'Lista todos os resgates de recompensas',
        tags: ['Resgates'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de resgates',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/RewardRedemption' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cria um novo resgate de recompensa',
        tags: ['Resgates'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RewardRedemptionRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Resgate criado com sucesso',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RewardRedemption' },
              },
            },
          },
          500: {
            description: 'Erro interno no servidor',
          },
        },
      },
    },
    '/reward-redemptions/{id}': {
      get: {
        summary: 'Busca um resgate pelo ID',
        tags: ['Resgates'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Resgate encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RewardRedemption' },
              },
            },
          },
          404: {
            description: 'Resgate não encontrado',
          },
        },
      },
      put: {
        summary: 'Atualiza um resgate de recompensa',
        tags: ['Resgates'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  quantity: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Resgate atualizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RewardRedemption' },
              },
            },
          },
          500: {
            description: 'Erro interno no servidor',
          },
        },
      },
      delete: {
        summary: 'Deleta um resgate de recompensa',
        tags: ['Resgates'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          204: { description: 'Resgate deletado com sucesso' },
          500: { description: 'Erro interno no servidor' },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};