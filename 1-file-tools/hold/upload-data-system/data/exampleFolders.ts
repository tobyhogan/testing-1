import type { FolderNode } from '../types'

export interface ExampleFolder {
  name: string
  description: string
  structure: FolderNode
}

export const exampleFolders: ExampleFolder[] = [
  {
    name: 'project-config',
    description: 'Project configuration folder with settings and environment files',
    structure: {
      name: 'project-config',
      type: 'folder',
      children: [
        {
          name: 'settings.json',
          type: 'file',
          fileType: '.json',
          data: {
            projectName: 'My Awesome Project',
            version: '1.0.0',
            author: 'Dev Team',
            repository: 'https://github.com/example/project'
          }
        },
        {
          name: 'environments',
          type: 'folder',
          children: [
            {
              name: 'development.json',
              type: 'file',
              fileType: '.json',
              data: {
                apiUrl: 'http://localhost:3000',
                debug: true,
                logLevel: 'verbose',
                features: { analytics: false, darkMode: true }
              }
            },
            {
              name: 'production.json',
              type: 'file',
              fileType: '.json',
              data: {
                apiUrl: 'https://api.production.com',
                debug: false,
                logLevel: 'error',
                features: { analytics: true, darkMode: true }
              }
            }
          ]
        },
        {
          name: 'database.json',
          type: 'file',
          fileType: '.json',
          data: {
            host: 'localhost',
            port: 5432,
            name: 'app_database',
            pool: { min: 2, max: 10 }
          }
        }
      ]
    }
  },
  {
    name: 'api-responses',
    description: 'Sample API response data with users, orders, and analytics',
    structure: {
      name: 'api-responses',
      type: 'folder',
      children: [
        {
          name: 'users',
          type: 'folder',
          children: [
            {
              name: 'user-list.json',
              type: 'file',
              fileType: '.json',
              data: {
                page: 1,
                totalPages: 5,
                users: [
                  { id: 'u1', username: 'johndoe', email: 'john@example.com', active: true },
                  { id: 'u2', username: 'janedoe', email: 'jane@example.com', active: true },
                  { id: 'u3', username: 'bobsmith', email: 'bob@example.com', active: false }
                ]
              }
            },
            {
              name: 'user-profile.json',
              type: 'file',
              fileType: '.json',
              data: {
                id: 'u1',
                username: 'johndoe',
                fullName: 'John Doe',
                email: 'john@example.com',
                avatar: 'https://example.com/avatars/johndoe.png',
                createdAt: '2024-01-15T10:30:00Z',
                preferences: { theme: 'dark', notifications: true, language: 'en' }
              }
            }
          ]
        },
        {
          name: 'orders',
          type: 'folder',
          children: [
            {
              name: 'recent-orders.json',
              type: 'file',
              fileType: '.json',
              data: {
                orders: [
                  { id: 'ord-001', customer: 'John Doe', total: 149.99, status: 'delivered', items: 3 },
                  { id: 'ord-002', customer: 'Jane Doe', total: 89.50, status: 'shipped', items: 2 },
                  { id: 'ord-003', customer: 'Bob Smith', total: 299.00, status: 'processing', items: 1 }
                ],
                summary: { totalOrders: 3, totalRevenue: 538.49 }
              }
            }
          ]
        },
        {
          name: 'analytics.json',
          type: 'file',
          fileType: '.json',
          data: {
            period: '2025-12',
            metrics: {
              pageViews: 15420,
              uniqueVisitors: 3250,
              bounceRate: 0.42,
              avgSessionDuration: 185
            },
            topPages: [
              { path: '/home', views: 5200 },
              { path: '/products', views: 3800 },
              { path: '/about', views: 1500 }
            ]
          }
        }
      ]
    }
  }
]
