const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'EncuentraMiMascota API',
    version: '1.0.0',
    description: 'Documentación interactiva de la API para la plataforma EncuentraMiMascota (BTH - Sistemas Informáticos). Permite registrar usuarios, autenticar con JWT, publicar anuncios de mascotas perdidas/encontradas, comentar y administrar usuarios.'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce el token JWT obtenido tras iniciar sesión con el formato: Bearer <token>'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Juan Pérez' },
          email: { type: 'string', format: 'email', example: 'juan@example.com' },
          role: { type: 'string', enum: ['user', 'admin'], example: 'user' }
        }
      },
      Post: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Firulais' },
          location: { type: 'string', example: 'Zona Central, La Paz' },
          phone: { type: 'string', example: '77712345' },
          description: { type: 'string', example: 'Perro mestizo café con collar rojo' },
          photo_url: { type: 'string', example: '/uploads/pet-1710000000.jpg' },
          reward: { type: 'number', example: 150.0 },
          status: { type: 'string', enum: ['Perdido', 'Encontrado', 'Reunido'], example: 'Perdido' },
          user_id: { type: 'integer', example: 2 },
          owner_name: { type: 'string', example: 'Juan Pérez' },
          owner_email: { type: 'string', format: 'email', example: 'juan@example.com' },
          created_at: { type: 'string', format: 'date-time', example: '2026-10-31 18:00:00' }
        }
      },
      Comment: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          post_id: { type: 'integer', example: 5 },
          user_id: { type: 'integer', example: 2 },
          user_name: { type: 'string', example: 'María Gómez' },
          content: { type: 'string', example: 'Lo vi cerca de la plaza mayor hace 20 minutos.' },
          created_at: { type: 'string', format: 'date-time', example: '2026-10-31 18:30:00' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Mensaje descriptivo del error.' }
        }
      },
      MessageResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Operación realizada con éxito.' }
        }
      }
    }
  },
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Autenticación'],
        summary: 'Registrar un nuevo usuario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Carlos Sánchez' },
                  email: { type: 'string', format: 'email', example: 'carlos@example.com' },
                  password: { type: 'string', format: 'password', example: 'password123' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario registrado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Usuario registrado exitosamente.' },
                    userId: { type: 'integer', example: 3 }
                  }
                }
              }
            }
          },
          400: {
            description: 'Campos faltantes o correo ya registrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Autenticación'],
        summary: 'Iniciar sesión y obtener token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'admin@bth.com' },
                  password: { type: 'string', format: 'password', example: 'admin123' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Inicio de sesión exitoso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Inicio de sesión exitoso.' },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Credenciales inválidas o incompletas',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/auth/me': {
      get: {
        tags: ['Autenticación'],
        summary: 'Obtener datos del usuario autenticado',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Datos del usuario actual',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          401: {
            description: 'No autorizado / Token ausente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Token inválido o expirado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/posts': {
      get: {
        tags: ['Publicaciones'],
        summary: 'Listar todas las publicaciones con opción de búsqueda',
        parameters: [
          {
            name: 'q',
            in: 'query',
            description: 'Término de búsqueda por nombre, ubicación o descripción',
            required: false,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Lista de publicaciones obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Post' }
                }
              }
            }
          },
          500: {
            description: 'Error al obtener publicaciones',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Publicaciones'],
        summary: 'Crear una nueva publicación de mascota',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['name', 'location', 'phone', 'description'],
                properties: {
                  name: { type: 'string', example: 'Bobby' },
                  location: { type: 'string', example: 'Miraflores, calle Cuba' },
                  phone: { type: 'string', example: '71234567' },
                  description: { type: 'string', example: 'Poodle blanco extraviado con placa' },
                  reward: { type: 'number', example: 100 },
                  photo: {
                    type: 'string',
                    format: 'binary',
                    description: 'Fotografía de la mascota (opcional)'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Publicación creada con éxito',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Anuncio publicado con éxito.' },
                    postId: { type: 'integer', example: 10 }
                  }
                }
              }
            }
          },
          400: {
            description: 'Faltan campos obligatorios',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          401: {
            description: 'No autorizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al crear la publicación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/posts/{id}': {
      get: {
        tags: ['Publicaciones'],
        summary: 'Obtener el detalle de una publicación por su ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la publicación',
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Detalle de la publicación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Post' }
              }
            }
          },
          404: {
            description: 'Publicación no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al consultar publicación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Publicaciones'],
        summary: 'Modificar una publicación existente (Dueño o Admin)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la publicación a editar',
            schema: { type: 'integer' }
          }
        ],
        requestBody: {
          required: false,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Bobby' },
                  location: { type: 'string', example: 'Nueva ubicación' },
                  phone: { type: 'string', example: '71234567' },
                  description: { type: 'string', example: 'Descripción actualizada' },
                  reward: { type: 'number', example: 200 },
                  status: { type: 'string', enum: ['Perdido', 'Encontrado', 'Reunido'], example: 'Reunido' },
                  photo: {
                    type: 'string',
                    format: 'binary',
                    description: 'Nueva foto para reemplazar la actual (opcional)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Publicación actualizada correctamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Publicación actualizada correctamente.' },
                    post: { $ref: '#/components/schemas/Post' }
                  }
                }
              }
            }
          },
          403: {
            description: 'No tienes permisos para modificar este anuncio',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'Publicación no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al actualizar publicación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Publicaciones'],
        summary: 'Eliminar una publicación (Dueño o Admin)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la publicación a eliminar',
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Publicación eliminada correctamente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MessageResponse' }
              }
            }
          },
          403: {
            description: 'Sin permisos para eliminar este anuncio',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'Publicación no encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al eliminar publicación',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/posts/{id}/comments': {
      get: {
        tags: ['Comentarios'],
        summary: 'Obtener los comentarios de una publicación',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la publicación',
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Lista de comentarios',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Comment' }
                }
              }
            }
          },
          500: {
            description: 'Error al obtener comentarios',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Comentarios'],
        summary: 'Agregar un comentario a una publicación',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID de la publicación a comentar',
            schema: { type: 'integer' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['content'],
                properties: {
                  content: { type: 'string', example: 'Vi un perro muy parecido cerca de la avenida principal.' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Comentario agregado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Comentario agregado.' },
                    comment: { $ref: '#/components/schemas/Comment' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Contenido del comentario vacío',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'La publicación no existe',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al agregar comentario',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users': {
      get: {
        tags: ['Administración de Usuarios'],
        summary: 'Listar todos los usuarios (Solo Admin)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de usuarios registrados',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' }
                }
              }
            }
          },
          403: {
            description: 'Acceso restringido a Administradores',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al obtener usuarios',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Administración de Usuarios'],
        summary: 'Crear un usuario nuevo directamente (Solo Admin)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password', 'role'],
                properties: {
                  name: { type: 'string', example: 'Nuevo Administrador' },
                  email: { type: 'string', format: 'email', example: 'nuevo_admin@bth.com' },
                  password: { type: 'string', format: 'password', example: 'adminPass123' },
                  role: { type: 'string', enum: ['user', 'admin'], example: 'admin' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuario creado con éxito',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Usuario creado con éxito.' },
                    userId: { type: 'integer', example: 4 }
                  }
                }
              }
            }
          },
          400: {
            description: 'Campos faltantes o correo ya registrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Acceso restringido a Administradores',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al crear usuario',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users/{id}': {
      put: {
        tags: ['Administración de Usuarios'],
        summary: 'Modificar datos o rol de un usuario (Solo Admin)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del usuario a editar',
            schema: { type: 'integer' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Nombre Modificado' },
                  email: { type: 'string', format: 'email', example: 'modificado@example.com' },
                  password: { type: 'string', format: 'password', example: 'nuevaClave123' },
                  role: { type: 'string', enum: ['user', 'admin'], example: 'admin' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Usuario actualizado con éxito',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MessageResponse' }
              }
            }
          },
          403: {
            description: 'Acceso restringido a Administradores',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al actualizar usuario',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Administración de Usuarios'],
        summary: 'Eliminar un usuario (Solo Admin)',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID del usuario a eliminar',
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'Usuario eliminado con éxito',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MessageResponse' }
              }
            }
          },
          400: {
            description: 'No se permite eliminar la propia cuenta de administrador logueada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          403: {
            description: 'Acceso restringido a Administradores',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          404: {
            description: 'Usuario no encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          },
          500: {
            description: 'Error al eliminar usuario',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerDocument;
