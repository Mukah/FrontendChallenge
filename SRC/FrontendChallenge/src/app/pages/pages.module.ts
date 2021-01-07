import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { HomePage } from './home/home.page';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    HomePage
  ]
})
export class PagesModule { }
