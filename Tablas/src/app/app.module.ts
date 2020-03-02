import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DataTablesModule } from "angular-datatables";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { TablasComponent } from './tablas/tablas.component';

@NgModule({
  declarations: [
    AppComponent,TablasComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    FontAwesomeModule,
    DataTablesModule, NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
