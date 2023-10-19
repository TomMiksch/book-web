import {createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator';

import {ModifyComponent} from './modify.component';
import {Navigation, NavigationExtras, Router} from '@angular/router';
import Spy = jasmine.Spy;
import {EditOrAddService} from '../edit-or-add.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

const mockEditOrAddServiceAdd = {
  getEditMode: () => false,
  getBookId: () => -1
};

const mockEditOrAddServiceEdit = {
  getEditMode: () => true,
  getBookId: () => 1
};

describe('ModifyComponent', () => {
  let spectator: Spectator<ModifyComponent>;

  describe('Add Mode', () => {
    let addSpyMode: Spy;
    let addSpyBook: Spy;

    const createComponent = createComponentFactory({
      component: ModifyComponent,
      providers: [mockProvider(EditOrAddService, mockEditOrAddServiceAdd)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    beforeEach(() => {
      addSpyMode = spyOn(mockEditOrAddServiceAdd, 'getEditMode').and.callThrough();
      addSpyBook = spyOn(mockEditOrAddServiceAdd, 'getBookId').and.callThrough();
      spectator = createComponent();
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have a header that says Add Book', () => {
      expect(spectator.query('h2')?.textContent).toContain('Add Book');
      expect(addSpyMode).toHaveBeenCalled();
      expect(addSpyBook).not.toHaveBeenCalled();
      expect(spectator.component.bookId).toEqual(-1);
    });

    it('should have add by ISBN', () => {
      expect(spectator.query('.isbn-box-label')).toContainText('Search by ISBN');
      expect(spectator.query('.isbn-box')).toExist();
      expect(spectator.query('.isbn-box-button')).toContainText('Search');
    });
  });

  describe('Edit Mode', () => {
    let editSpyMode: Spy;
    let editSpyBook: Spy;

    const createComponent = createComponentFactory({
      component: ModifyComponent,
      providers: [mockProvider(EditOrAddService, mockEditOrAddServiceEdit)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    beforeEach(() => {
      editSpyMode = spyOn(mockEditOrAddServiceEdit, 'getEditMode').and.callThrough();
      editSpyBook = spyOn(mockEditOrAddServiceEdit, 'getBookId').and.callThrough();
      spectator = createComponent();
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have a header that says Edit Book', () => {
      expect(spectator.query('h2')?.textContent).toContain('Edit Book');
      expect(editSpyMode).toHaveBeenCalled();
      expect(editSpyBook).toHaveBeenCalled();
      expect(spectator.component.bookId).toEqual(1);
    });
  });
});
