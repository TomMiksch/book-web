import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { IsbnService } from './isbn.service';

describe('IsbnService', () => {
  let spectator: SpectatorService<IsbnService>;
  const createService = createServiceFactory(IsbnService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});