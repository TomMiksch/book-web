import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookComponent} from './book/book.component';
import {ModifyComponent} from './modify/modify.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'books', component: BookComponent},
  {path: 'addBook', component: ModifyComponent},
  {path: 'editBook', component: ModifyComponent}
];
//this.selectedGrid = this.route?.snapshot?.queryParams?.selectedGrid ?? null;
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, initialNavigation: 'disabled', relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
