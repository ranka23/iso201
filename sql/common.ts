export const insert = (table: string, columns: string[], returning?: string) =>
  `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns
    .map((_, index) => "$" + (index + 1))
    .join(", ")}) RETURNING ${returning ? returning : '*'}`

export const select = (table: string, column: string) =>
  `SELECT * FROM ${table} WHERE ${column} = $1`

export const update = (table: string, columns: string[], select?: string, returning?: string) => {
  const set = columns.map((column, index) => `${column} = $${index + 1}`).join(", ")
  return `UPDATE ${table} SET ${set} WHERE ${select || "id"} = $${columns.length + 1} RETURNING ${returning ? returning : '*'}`
}