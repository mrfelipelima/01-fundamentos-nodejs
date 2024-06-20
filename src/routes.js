import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    path: '/users',
    method: 'GET',
    handler: (req, res) => {
      const users = database.select('users')
      return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
    }
  },
  {
    path: '/users',
    method: 'POST',
    handler: (req, res) => {
      const { name, email } = req.body
      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)
      
      return res.writeHead(201).end()
    }
  }
]