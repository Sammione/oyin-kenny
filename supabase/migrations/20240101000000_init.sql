-- Guest Table
CREATE TABLE public."Guest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL DEFAULT false,
    "qrToken" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "checkInTime" TIMESTAMP(3) WITH TIME ZONE,
    "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Guest_phone_key" ON public."Guest"("phone");
CREATE UNIQUE INDEX "Guest_qrToken_key" ON public."Guest"("qrToken");

-- AdminUser Table
CREATE TABLE public."AdminUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AdminUser_username_key" ON public."AdminUser"("username");
