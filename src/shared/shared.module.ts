import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';

const materialModules = [
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule
]

const commonModules = [
    RouterModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
]

const components = [
    HeaderComponent,
    ConfirmationComponent,
]

@NgModule({
    imports: [
        commonModules,
        materialModules,
    ],
    exports: [
        materialModules,
        components
    ],
    declarations: [
        components,
    ],
    providers: [],
})
export class SharedModule { }