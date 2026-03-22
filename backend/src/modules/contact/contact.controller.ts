import { Controller, Post, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('api/v1/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('institutional')
  async sendInstitutionalContact(@Body() body: any) {
    return this.contactService.sendInstitutionalContact(body);
  }

  @Post(':projectId')
  async sendProjectContact(
    @Param('projectId') projectId: string,
    @Body() body: any,
  ) {
    return this.contactService.sendProjectContact(parseInt(projectId), body);
  }
}
