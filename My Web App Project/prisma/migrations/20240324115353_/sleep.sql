-- CreateTable
CREATE TABLE "Sleep" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Age_range" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "Sleep_duration" TEXT NOT NULL,
    "Sleep_time" TEXT NOT NULL,
    "Email_address" TEXT NOT NULL,

    CONSTRAINT "Sleep_pkey" PRIMARY KEY ("Id")
);
