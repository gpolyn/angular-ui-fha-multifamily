import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { MSAWaiverComponent } from './msa-waiver.component';
import { ProjectStatusComponent } from './project-status.component';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    ProjectComponent,
    ProjectStatusComponent,  
    MSAWaiverComponent
  ],
  exports: [
    ProjectComponent
  ]
})

export class ProjectCharacteristicsModule { }
