import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  header: string = 'Loading...'
  editMode: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.editMode = this.router
    // TODO create a shared service I guess f***
    console.log('=============>', this.router);
    console.log('=============>', this.editMode);
    if (this.editMode != undefined) {
      this.header = this.editMode ? 'Edit Book' : 'Add Book';
    }
  }
}
