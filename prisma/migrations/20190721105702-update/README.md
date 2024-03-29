# Migration `20190721105702-update`

This migration has been generated by Frantisek Bohacek at 7/21/2019, 10:57:02 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "dev"."Post";

CREATE TABLE "dev"."Entity"("id" TEXT NOT NULL  ,"name" TEXT NOT NULL DEFAULT '' ,PRIMARY KEY ("id"));

CREATE TABLE "dev"."_EntityToUser"("A" TEXT NOT NULL  REFERENCES Entity(id),"B" TEXT NOT NULL  REFERENCES User(id));

CREATE UNIQUE INDEX "dev"."Entity.id._UNIQUE" ON "Entity"("id")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190624162221-init..20190721105702-update
--- datamodel.dml
+++ datamodel.dml
@@ -1,27 +1,21 @@
 datasource db {
   provider = "sqlite"
-  url      = "file:dev.db"
-  default  = true
+  url      = "file:./dev.db"
 }
 generator photon {
   provider = "photonjs"
-  output   = "../node_modules/@generated/photon"
 }
 model User {
   id    String  @default(cuid()) @id @unique
   email String  @unique
   name  String?
-  posts Post[]
+  entities Entity[]
 }
-model Post {
-  id        String   @default(cuid()) @id @unique
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
-  published Boolean
-  title     String
-  content   String?
-  author    User?
-}
+model Entity {
+  id      String  @default(cuid()) @id @unique
+  users   User[]
+  name    String
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190721105702-update)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190721105702-update'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
