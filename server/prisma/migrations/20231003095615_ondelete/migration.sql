-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_lId_fkey";

-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_uId_fkey";

-- DropForeignKey
ALTER TABLE "Usercategories" DROP CONSTRAINT "Usercategories_uId_fkey";

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_uId_fkey" FOREIGN KEY ("uId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_lId_fkey" FOREIGN KEY ("lId") REFERENCES "TodoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usercategories" ADD CONSTRAINT "Usercategories_uId_fkey" FOREIGN KEY ("uId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
