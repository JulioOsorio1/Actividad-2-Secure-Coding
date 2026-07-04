

import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';


const ALLOWED_HOSTS = new Set([
  'api.github.com',
  'jsonplaceholder.typicode.com',
  'api.openweathermap.org',
]);

@Controller('proxy')
export class ProxyController {
  @Get('/fetch')
  async fetch(@Query('url') url: string): Promise<string> {
    if (!url) {
      throw new BadRequestException('URL requerida');
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new BadRequestException('URL malformada');
    }

    
    if (parsed.protocol !== 'https:') {
      throw new BadRequestException('Solo se permite HTTPS');
    }

    
    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      throw new BadRequestException('Host no permitido');
    }
    const response = await axios.get(url, { maxRedirects: 0 });
    return response.data;
  }
}
