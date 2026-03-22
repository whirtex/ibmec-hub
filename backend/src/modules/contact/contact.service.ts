import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async sendInstitutionalContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    contactType?: string;
  }) {
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new BadRequestException(
        'Missing required fields: name, email, subject, message',
      );
    }

    const contactMessage = await this.prisma.contactMessage.create({
      data: {
        type: 'institutional',
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'queued',
      },
    });

    return {
      id: contactMessage.id,
      status: contactMessage.status,
      message: 'Contact message received. We will get back to you soon.',
    };
  }

  async sendProjectContact(
    projectId: number,
    data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    },
  ) {
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new BadRequestException(
        'Missing required fields: name, email, subject, message',
      );
    }

    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const contactMessage = await this.prisma.contactMessage.create({
      data: {
        type: 'project',
        projectId,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'queued',
      },
    });

    return {
      id: contactMessage.id,
      projectId: contactMessage.projectId,
      status: contactMessage.status,
      message: 'Contact message received. We will get back to you soon.',
    };
  }
}
