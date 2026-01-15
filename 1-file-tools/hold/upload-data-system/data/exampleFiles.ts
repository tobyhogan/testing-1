import type { FileType } from '../upload-data-system/types'

export interface ExampleFile {
  name: string
  type: FileType
  description: string
  data: unknown
}

export const exampleFiles: ExampleFile[] = [
  {
    name: 'users-example.json',
    type: '.json',
    description: 'Sample user data with profiles',
    data: {
      users: [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'admin' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, role: 'user' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 22, role: 'user' }
      ],
      metadata: {
        totalUsers: 3,
        lastUpdated: '2025-12-10'
      }
    }
  },
  {
    name: 'products-example.json',
    type: '.json',
    description: 'E-commerce product catalog',
    data: {
      products: [
        { sku: 'LAPTOP-001', name: 'Pro Laptop 15"', price: 1299.99, inStock: true, category: 'Electronics' },
        { sku: 'PHONE-002', name: 'SmartPhone X', price: 899.99, inStock: true, category: 'Electronics' },
        { sku: 'DESK-003', name: 'Standing Desk', price: 549.00, inStock: false, category: 'Furniture' }
      ],
      currency: 'USD',
      storeId: 'STORE-US-001'
    }
  },
  {
    name: 'config-example.jsonc',
    type: '.jsonc',
    description: 'App configuration with comments',
    data: {
      appName: 'My Application',
      version: '2.1.0',
      settings: {
        theme: 'dark',
        language: 'en',
        notifications: true,
        autoSave: true,
        autoSaveInterval: 300
      },
      features: {
        betaFeatures: false,
        analytics: true,
        debugMode: false
      }
    }
  },
  {
    name: 'tasks-example.jsonc',
    type: '.jsonc',
    description: 'Project tasks with comments',
    data: {
      project: 'Website Redesign',
      tasks: [
        { id: 1, title: 'Design mockups', status: 'completed', priority: 'high', assignee: 'Design Team' },
        { id: 2, title: 'Frontend development', status: 'in-progress', priority: 'high', assignee: 'Dev Team' },
        { id: 3, title: 'Backend API', status: 'in-progress', priority: 'medium', assignee: 'Dev Team' },
        { id: 4, title: 'Testing & QA', status: 'pending', priority: 'medium', assignee: 'QA Team' }
      ],
      deadline: '2025-12-31'
    }
  }
]
