import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatDialogModule, MatCardModule, MatToolbarModule, MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule
  ],
  exports: [
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule
  ]
})
export class MaterialModule { }
