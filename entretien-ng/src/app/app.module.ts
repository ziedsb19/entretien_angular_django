import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { NgxAnnotateTextModule } from 'ngx-annotate-text';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AnnotationComponent
  ],
  imports: [
    BrowserModule,
    NgxAnnotateTextModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
