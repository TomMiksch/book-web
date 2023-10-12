import {createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator';

import {ModifyComponent} from './modify.component';
import {Navigation, NavigationExtras, Router} from '@angular/router';
import Spy = jasmine.Spy;

const addNav = {
  extras: {
    state: {
      editMode: false
    }
  } as NavigationExtras
} as Navigation;

const editNav = {
  extras: {
    state: {
      editMode: true,
      bookId: 1
    }
  } as NavigationExtras
} as Navigation;

const mockRouterAdd = {
  getCurrentNavigation: () => addNav
};

const mockRouterEdit = {
  getCurrentNavigation: () => editNav
};

describe('ModifyComponent', () => {
  let spectator: Spectator<ModifyComponent>;

  describe('Add Mode', () => {
    let addSpy: Spy;

    const createComponent = createComponentFactory({
      component: ModifyComponent,
      providers: [mockProvider(Router, mockRouterAdd)]
    });

    beforeEach(() => {
      addSpy = spyOn(mockRouterAdd, 'getCurrentNavigation').and.callThrough();
      spectator = createComponent();
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have a header that says Loading', () => {
      expect(spectator.query('h2')?.textContent).toContain('Add Book')
    });
  });

  describe('Edit Mode', () => {
    let editSpy: Spy;

    const createComponent = createComponentFactory({
      component: ModifyComponent,
      providers: [mockProvider(Router, mockRouterEdit)]
    });

    beforeEach(() => {
      editSpy = spyOn(mockRouterEdit, 'getCurrentNavigation').and.callThrough();
      spectator = createComponent();
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have a header that says Loading', () => {
      expect(spectator.query('h2')?.textContent).toContain('Edit Book')
    });
  });
});
