import { NextApiRequest, NextApiResponse } from "next"
import { conn } from "../../../utils/database"

export default function users (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      index(res)      
      break
  
    default:
      res.status(401).json("No encontrado")
      break
  }
}

async function index(res: NextApiResponse) {
  const { rows } = await conn.query('SELECT * FROM technologies')  
  return res.status(200).json(rows)
}
