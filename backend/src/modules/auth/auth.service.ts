import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { companyProfile: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO: Generate JWT tokens
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyProfile: user.companyProfile,
      // accessToken: 'jwt-token-here',
      // refreshToken: 'jwt-refresh-token-here',
    };
  }

  async registerCompany(data: {
    name: string;
    email: string;
    password: string;
    cnpj: string;
    companySize: string;
    ibmecRelationship: string;
    industry: string;
    demandType: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const existingCompany = await this.prisma.companyProfile.findUnique({
      where: { cnpj: data.cnpj },
    });

    if (existingCompany) {
      throw new BadRequestException('CNPJ already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashedPassword,
        role: 'company',
        companyProfile: {
          create: {
            cnpj: data.cnpj,
            companySize: data.companySize,
            ibmecRelationship: data.ibmecRelationship,
            industry: data.industry,
            demandType: data.demandType,
          },
        },
      },
      include: { companyProfile: true },
    });

    // TODO: Generate JWT tokens
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyProfile: user.companyProfile,
      // accessToken: 'jwt-token-here',
      // refreshToken: 'jwt-refresh-token-here',
    };
  }

  async getMe(userId: number) {
    if (!userId) {
      throw new UnauthorizedException('No user authenticated');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { companyProfile: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyProfile: user.companyProfile,
    };
  }
}
