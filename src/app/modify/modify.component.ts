import {Component, OnInit} from '@angular/core';
import {EditOrAddService} from '../edit-or-add.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  header: string = 'Loading...'
  bookId: number = -1;

  constructor(private editOrAddService: EditOrAddService) {
  }

  ngOnInit(): void {
    let editMode = this.editOrAddService.getEditMode();
    this.header = editMode ? 'Edit Book' : 'Add Book';
    if (editMode) {
      this.bookId = this.editOrAddService.getBookId();
    }
  }
}
