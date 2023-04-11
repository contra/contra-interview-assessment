-- CreateTable
CREATE TABLE "UserFlag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "featureFlagId" INTEGER NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "UserFlag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFlag_userId_featureFlagId_key" ON "UserFlag"("userId", "featureFlagId");

-- AddForeignKey
ALTER TABLE "UserFlag" ADD CONSTRAINT "UserFlag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFlag" ADD CONSTRAINT "UserFlag_featureFlagId_fkey" FOREIGN KEY ("featureFlagId") REFERENCES "FeatureFlag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
