import { es } from "."

export const createMappings = () => {
  es().indices.putMapping({
    index: 'assets',
    
  })
}