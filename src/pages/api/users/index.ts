import { NextApiRequest, NextApiResponse } from "next"
import { conn } from "../../../utils/database"

export default function users (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      index(res)      
      break

    case "POST":
      create(req, res)
      break
  
    default:
      res.status(401).json("No encontrado")
      break
  }
}

async function index(res: NextApiResponse) {
  const { rows } = await conn.query('SELECT * FROM users')  
  return res.status(200).json(rows)
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body
  const { rowCount } = await conn.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])

  if (rowCount) {
    return res.status(201).json('Usuario creado correctamente')
  } else {
    return res.status(500).json('Error al crear al usuario')
  }
}
