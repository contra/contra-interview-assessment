-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "familyName" TEXT,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("email","name")
);

-- CreateTable
CREATE TABLE "FeatureFlagSelection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "possibleValues" JSONB[],

    CONSTRAINT "FeatureFlagSelection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlagSelection_name_key" ON "FeatureFlagSelection"("name");

-- AddForeignKey
ALTER TABLE "FeatureFlag" ADD CONSTRAINT "FeatureFlag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
