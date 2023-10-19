import {Spectator, createComponentFactory, mockProvider} from '@ngneat/spectator';

import { HomeComponent } from './home.component';
import {Router} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import Spy = jasmine.Spy;
import {EditOrAddService} from '../edit-or-add.service';

const mockRouter = {
  navigate: () => Promise.resolve('Lol buttfart'),
};

const mockEditOrAddService = {
  setEditMode: (thing: boolean) => null
}

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  let routerSpy: Spy;
  let addSpy: Spy;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    providers: [
      mockProvider(Router, mockRouter),
      mockProvider(EditOrAddService, mockEditOrAddService)
    ],
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    routerSpy = spyOn(mockRouter, 'navigate').and.callThrough();
    addSpy = spyOn(mockEditOrAddService, 'setEditMode').and.callThrough();
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show buttons for show all and add', () => {
    const buttons = spectator.queryAll('button');
    expect(buttons[0].textContent).toContain('Show All Books');
    expect(buttons[1].textContent).toContain('Add Book');
  });

  it('should take you to the list of books when clicked on', () => {
    spectator.click('#list-button');
    expect(routerSpy).toHaveBeenCalledWith(['/books']);
  });

  it('should take the user to the add page when clicking that button', () => {
    spectator.click('#add-button');
    expect(routerSpy).toHaveBeenCalledWith(['/addBook']);
    expect(addSpy).toHaveBeenCalledWith(false);
  });
});
