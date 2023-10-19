import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditOrAddService {

  private editMode: boolean = false;
  private bookId: number = 0;

  constructor() { }

  public getEditMode(): boolean {
    return this.editMode;
  }

  public getBookId(): number {
    return this.bookId;
  }

  public setEditMode(mode: boolean) {
    this.editMode = mode;
    if (!mode) {
      this.bookId = -1;
    }
  }

  public setBookId(id: number) {
    this.bookId = id;
  }
}
