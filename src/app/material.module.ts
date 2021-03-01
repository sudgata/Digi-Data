import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    exports: [MatInputModule,
              MatButtonModule,
              MatCardModule,
              MatToolbarModule,
              MatDividerModule,
              MatTableModule,
              MatProgressSpinnerModule,
              MatIconModule,
              MatAutocompleteModule,
              MatFormFieldModule,
              MatMenuModule,
              MatSnackBarModule,
              MatDialogModule,
              MatProgressBarModule,
              MatTooltipModule],
})
export class MaterialModule { }
