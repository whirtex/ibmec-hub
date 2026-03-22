import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: InstanceType<typeof PrismaClient>;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async onModuleInit() {
    await this.prismaClient.$connect();
  }

  async onModuleDestroy() {
    await this.prismaClient.$disconnect();
  }

  // Expose Prisma client models
  get user() {
    return this.prismaClient.user;
  }

  get companyProfile() {
    return this.prismaClient.companyProfile;
  }

  get project() {
    return this.prismaClient.project;
  }

  get contactMessage() {
    return this.prismaClient.contactMessage;
  }

  // Allow direct access to client if needed
  getClient() {
    return this.prismaClient;
  }
}
