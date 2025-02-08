// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  singlestoreTable,
  bigint,
  text,
  singlestoreTableCreator,
} from "drizzle-orm/singlestore-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator((name) => `doraibu_${name}`);

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name"),
  age: bigint("age", { mode: "number" }),
});
