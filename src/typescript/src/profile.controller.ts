
import { Body, Controller, Put, Request } from '@nestjs/common';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { instanceToPlain } from 'class-transformer';

class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  displayName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  bio?: string;
}

@Controller('users')
export class ProfileController {
  private readonly users: Record<string, Record<string, unknown>> = {
    'user-1': { id: 'user-1', username: 'alice', email: 'alice@example.com', isAdmin: false, role: 'user' },
    'user-2': { id: 'user-2', username: 'bob', email: 'bob@example.com', isAdmin: false, role: 'user' },
  };

  @Put('/profile')
  async updateProfile(
    @Request() req: any,
    @Body() dto: UpdateProfileDto,  
  ): Promise<{ message: string }> {
    const userId = req.user?.id ?? 'user-1';
    const safeFields = instanceToPlain(dto);
    Object.assign(this.users[userId], safeFields);
    return { message: 'Perfil actualizado' };
  }
}
