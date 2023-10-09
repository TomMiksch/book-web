import {createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator';
import {BookService} from './book.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('BookService', () => {
  let spectator: SpectatorHttp<BookService>;
  const createService = createHttpFactory({
    service: BookService,
    schemas: [NO_ERRORS_SCHEMA],
  });

  beforeEach(() => spectator = createService());

  it('should exist', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call the right endpoint', () => {
    spectator.service.getAll().subscribe();
    spectator.expectOne('http://localhost:8080/book/getAll', HttpMethod.GET)
  });
});
