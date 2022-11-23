export const insert = (table: string, columns: string[], returning?: string) =>
  `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns
    .map((_, index) => "$" + (index + 1))
    .join(", ")}) RETURNING ${returning ? returning : "*"}`

export const select = (table: string, column: string) =>
  `SELECT * FROM ${table} WHERE ${column} = $1`

export const selectResponse = (table: string, column: string, respondWith: string[]) =>
  `SELECT ${respondWith.join(', ')} FROM ${table} WHERE ${column} = $1`

export const update = (
  table: string,
  select: string,
  columns: string[],
  returning = "*"
) => {
  const set = columns
    .map((column, index) => `${column} = $${index + 1}`)
    .join(", ")
  return `UPDATE ${table} SET ${set} WHERE ${select || "id"} = $${
    columns.length + 1
  } RETURNING ${returning}`
}

export const selectMany = (table: string, columns: string[], select = "*") => {
  const set = columns
    .map((column, index) => `${column} = $${index + 1}`)
    .join(", ")
  return `SELECT * FROM ${table} WHERE ${set}`
}
