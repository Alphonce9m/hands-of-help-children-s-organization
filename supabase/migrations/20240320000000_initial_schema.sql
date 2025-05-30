-- Create enums
CREATE TYPE "DonationStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED', 'EXPIRED');
CREATE TYPE "DonationFrequency" AS ENUM ('ONE_TIME', 'MONTHLY', 'QUARTERLY', 'YEARLY');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED', 'COMPLETED', 'FAILED', 'EXPIRED');

-- Create Donor table
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "mpesaAccountType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- Create Donation table
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "DonationStatus" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "frequency" "DonationFrequency" NOT NULL,
    "mpesaReceiptNumber" TEXT,
    "mpesaCheckoutRequestId" TEXT,
    "mpesaMerchantRequestId" TEXT,
    "mpesaTransactionDate" TIMESTAMP(3),
    "mpesaResultCode" TEXT,
    "mpesaResultDesc" TEXT,
    "mpesaCallbackMetadata" JSONB,
    "mpesaAccountBalance" TEXT,
    "mpesaTransactionType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donorId" TEXT,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- Create Subscription table
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "frequency" "DonationFrequency" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "lastPaymentAt" TIMESTAMP(3),
    "nextPaymentAt" TIMESTAMP(3),
    "mpesaCheckoutRequestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donorId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- Create Admin table
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaSecret" TEXT,
    "mfaBackupCodes" TEXT[],
    "mfaRememberToken" TEXT,
    "mfaRememberExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- Create ContactMessage table
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");
CREATE INDEX "Donor_phoneNumber_idx" ON "Donor"("phoneNumber");

CREATE UNIQUE INDEX "Donation_reference_key" ON "Donation"("reference");
CREATE INDEX "Donation_phoneNumber_idx" ON "Donation"("phoneNumber");
CREATE INDEX "Donation_status_idx" ON "Donation"("status");
CREATE INDEX "Donation_mpesaReceiptNumber_idx" ON "Donation"("mpesaReceiptNumber");
CREATE INDEX "Donation_mpesaCheckoutRequestId_idx" ON "Donation"("mpesaCheckoutRequestId");
CREATE INDEX "Donation_mpesaTransactionDate_idx" ON "Donation"("mpesaTransactionDate");
CREATE INDEX "Donation_createdAt_idx" ON "Donation"("createdAt");

CREATE INDEX "Subscription_phoneNumber_idx" ON "Subscription"("phoneNumber");
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");
CREATE INDEX "Subscription_nextPaymentAt_idx" ON "Subscription"("nextPaymentAt");
CREATE INDEX "Subscription_mpesaCheckoutRequestId_idx" ON "Subscription"("mpesaCheckoutRequestId");

CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- Add foreign key constraints
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 