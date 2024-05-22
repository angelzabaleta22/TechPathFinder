import { NextApiRequest, NextApiResponse } from "next"
import { conn } from "../../../utils/database"

export default function user (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { id } = req.query

  switch (method) {
    case "GET":
      index(res, id)      
      break;

    case "PUT":
      update(req, res, id)
      break;

    case "DELETE":
      deleteById(res, id)
      break;
  
    default:
      res.status(401).json("No encontrado")
      break;
  }
}

async function index(res: NextApiResponse, id: any) {
  const { rows } = await conn.query('SELECT * FROM users WHERE id = $1', [id])
  return res.status(200).json(rows[0])
}

async function update(req: NextApiRequest, res: NextApiResponse, id: any) {
  const { username, email, password } = req.body
  const { rowCount } = await conn.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4', [username, email, password, id])

  if (rowCount) {
    return res.status(200).json('Usuario actualizado correctamente')
  } else {
    return res.status(500).json('Error al actualiza usuario')
  }
}

async function deleteById(res: NextApiResponse, id: any) {
  const { rowCount } = await conn.query('DELETE FROM users WHERE id = $1', [id])
  if (rowCount) {
    return res.status(200).json('Usuario elimiando')
  } else {
    return res.status(500).json('Error al eliminar usuario')
  }
}
