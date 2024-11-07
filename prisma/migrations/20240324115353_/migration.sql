-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age_range" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sleep_duration" TEXT NOT NULL,
    "sleep_time" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
