import { insert } from "sql/common"
import { pg } from "services"

export default class Like {
  userid: number
  assetid: number
  created?: string

  constructor(userid: number, assetid: number) {
    this.userid = userid
    this.assetid = assetid
  }

  async create() {
    const query = insert("likes", ["userid", "assetid"])
    const values = [this.userid, this.assetid]

    try {
      const {
        rows: [likes],
      } = await pg().query<Like>(query, values)
      return likes
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async delete() {
    const query = `DELETE FROM likes WHERE userid=$1 AND assetid=$2 RETURNING *`
    const value = [this.userid, this.assetid]

    try {
      const {
        rows: [likes], 
      } = await pg().query<Like>(query, value)
      console.log("DELETE LIKES: ", likes)
      return likes
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async hasLiked() {
    const query = `SELECT * FROM likes WHERE userid=$1 AND assetid=$2`
    const value = [this.userid, this.assetid]
    try {
      const {
        rows: [likes],
      } = await pg().query<Like>(query, value)
      return !!likes
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
