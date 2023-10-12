import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showAllBooks() {
    this.router.navigate(['/books']).then(res => console.log(res));
  }

  addBook() {
    this.router.navigate(['/addBook'], {
      state: {
        editMode: false
      }
    }).then(res => console.log(res));
  }
}
