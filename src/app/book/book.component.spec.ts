import {byTestId, createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator';

import {BookComponent} from './book.component';
import {BookService} from '../book.service';
import {of} from 'rxjs';
import {Book} from '../objects/Book';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import Spy = jasmine.Spy;
import {MatTableModule} from '@angular/material/table';
import {Router} from '@angular/router';

let expectedBook = {
  id: 1,
  title: 'Man Stuff',
  author: 'Jimbo Himbo',
  publisher: 'Gumbo Jumbo',
  stillHave: true,
  location: 'Office'
} as Book;

const mockBookService = {
  getAll: () => of([expectedBook])
}

const mockRouter = {
  navigate: () => {},
};

describe('BookComponent', () => {
  let spectator: Spectator<BookComponent>;
  let getAllSpy: Spy;
  let routerNavigateSpy: Spy;
  const createComponent = createComponentFactory({
    component: BookComponent,
    providers: [
      mockProvider(BookService, mockBookService),
      mockProvider(Router, mockRouter)
    ],
    imports: [MatTableModule],
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    getAllSpy = spyOn(mockBookService, 'getAll').and.callThrough();
    routerNavigateSpy = spyOn(mockRouter, 'navigate').and.callThrough();
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have the header', () => {
    expect(spectator.query('h2')).toContainText('In The Library');
  });

  it('should call the backend and get the book list on load', () => {
    expect(getAllSpy).toHaveBeenCalled()
    expect(spectator.component.books).toEqual([expectedBook])
  });

  describe('Book Table', () => {
    it('should display the headers in a table', () => {
      const headers = spectator.queryAll('th');
      expect(headers[0]).toContainText('ID');
      expect(headers[1]).toContainText('Title');
      expect(headers[2]).toContainText('Author');
      expect(headers[3]).toContainText('Publisher');
      expect(headers[4]).toContainText('Still Have');
      expect(headers[5]).toContainText('Location');
      expect(headers[6]).toContainText('Edit');
    });

    it('should display the book data', () => {
      const data = spectator.queryAll('td');
      expect(data[0]).toContainText('1');
      expect(data[1]).toContainText('Man Stuff');
      expect(data[2]).toContainText('Jimbo Himbo');
      expect(data[3]).toContainText('Gumbo Jumbo');
      expect(data[4]).toContainText('true');
      expect(data[5]).toContainText('Office');
      expect(data[6]).toContainText('Edit');
    });

    it('should take the user to the edit page when clicking that button', () => {
      spectator.click(('button'));
      expect(routerNavigateSpy).toHaveBeenCalledWith([`/editBook`], {
        state: {
          editMode: true,
          bookId: 1
        },
      });
    });
  });
});
