import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EditOrAddService } from './edit-or-add.service';

describe('EditOrAddService', () => {
  let spectator: SpectatorService<EditOrAddService>;
  const createService = createServiceFactory(EditOrAddService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should correctly set edit mode true', () => {
    spectator.service.setBookId(3);
    spectator.service.setEditMode(true);
    expect(spectator.service.getEditMode()).toBeTruthy();
    expect(spectator.service.getBookId()).toEqual(3);
  });

  it('should correctly set edit mode false', () => {
    spectator.service.setBookId(3);
    spectator.service.setEditMode(false);
    expect(spectator.service.getEditMode()).toBeFalsy();
    expect(spectator.service.getBookId()).toEqual(-1)
  });
});
