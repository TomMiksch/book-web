import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EditOrAddService} from '../edit-or-add.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private editOrAddService: EditOrAddService,
              private router: Router) { }

  ngOnInit(): void {
  }

  showAllBooks() {
    this.router.navigate(['/books']).then(res => console.log(res));
  }

  addBook() {
    this.editOrAddService.setEditMode(false);
    this.router.navigate(['/addBook']).then(res => console.log(res));
  }
}
