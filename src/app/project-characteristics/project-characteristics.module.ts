import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { MSAWaiverComponent } from './msa-waiver.component';
import { ProjectStatusComponent } from './project-status.component';
import { INITIAL_CONFIG, PROJECT_CONFIG } from './config';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    { provide: PROJECT_CONFIG, useValue: INITIAL_CONFIG }
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
