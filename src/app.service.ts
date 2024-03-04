import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { Character } from './Character';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.log(await this.getRickAndMortyCh());
  }

  async getRickAndMortyCh() {
    const { data } = await firstValueFrom(
      this.httpService.get<Character>(
        'https://rickandmortyapi.com/api/character/2',
      ),
    );
    const { id, name, status, species } = data;

    return { id, name, status, species }; //recoge los datos especificos por la const
    // return { id, name, status, species };
    // return data; recoge todos los datos
    // return data.id; recoge solo la id
  }
}
