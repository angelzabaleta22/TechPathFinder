import { NextApiRequest, NextApiResponse } from "next"
import { conn } from "../../../utils/database"

export default function offers (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { keyword } = req.query

  switch (method) {
    case "GET":
      if (!keyword) {
        index(res)      
      } else {
        getByKeyword(res, keyword)
      }
      break
  
    default:
      res.status(401).json("No encontrado")
      break
  }
}

async function index(res: NextApiResponse) {
  const technologies = await conn.query(
    'SELECT t.id, t.name AS technology, c.name AS category FROM technologies AS t INNER JOIN categories AS c ON t.category_id = c.id'
  )

  for (let i: number = 0; i < technologies.rows.length; i++) {
    const subquery: string = `(?<![a-zA-Z])${technologies.rows[i].technology.replace(/([+.#/])/g, '\\$1')}(?![a-zA-Z])`

    const { rows } = await conn.query(
      'SELECT COUNT(o.id) FROM offers AS o WHERE o.title ~* $1 OR o.description ~* $1 OR o.keywords  ~* $1',
      [subquery]
    )

    technologies.rows[i].totalOffers = parseInt(rows[0].count)
  }

  technologies.rows.sort((a: any, b: any) => b.totalOffers - a.totalOffers)
  return res.status(200).json(technologies.rows)
}

async function getByKeyword(res: NextApiResponse, keyword: any) {
  const subquery: string = `(?<![a-zA-Z])${keyword.replace(/([+.#/])/g, '\\$1')}(?![a-zA-Z])`

  const { rows } = await conn.query(
    'SELECT * FROM offers AS o WHERE o.title ~* $1 OR o.description ~* $1 OR o.keywords  ~* $1',
    [subquery]
  )

  return res.status(200).json(rows)
}
