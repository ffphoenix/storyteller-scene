import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetMyGamesQuery, GetGameDataQuery } from '../game.queries';
import { IGameRepository } from '../../../domain/repositories/game.repository.interface';
import { GameResponseDto } from '../../../presentation/dto/game.dto';
import { Game } from 'src/modules/game/domain/aggregates/game.aggregate';

@QueryHandler(GetMyGamesQuery)
export class GetMyGamesHandler implements IQueryHandler<GetMyGamesQuery> {
  constructor(@Inject(IGameRepository) private readonly repository: IGameRepository) {}

  async execute(query: GetMyGamesQuery): Promise<GameResponseDto[]> {
    const games = await this.repository.findAllByOwnerId(query.userId);
    return games.map((game) => ({
      id: game.getId(),
      shortUrl: game.getShortUrl(),
      name: game.getName(),
      status: game.getStatus(),
    }));
  }
}

@QueryHandler(GetGameDataQuery)
export class GetGameDataHandler implements IQueryHandler<GetGameDataQuery> {
  constructor(@Inject(IGameRepository) private readonly repository: IGameRepository) {}

  async execute(query: GetGameDataQuery): Promise<GameResponseDto> {
    let game: Game;
    // Try by ID if it looks like a number
    if (/^\d+$/.test(query.idOrShortUrl)) {
      game = await this.repository.findById(Number(query.idOrShortUrl));
    }

    // If not found by ID or not a number, try by shortUrl
    if (!game) {
      game = await this.repository.findByShortUrl(query.idOrShortUrl);
    }

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return {
      id: game.getId(),
      shortUrl: game.getShortUrl(),
      name: game.getName(),
      status: game.getStatus(),
    };
  }
}
