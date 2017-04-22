import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CURRENT_AUTHOR_ID } from './app-config';
import { LocalStorageService } from './localStorage.service';

export interface IProjectCharacteristics {
  is_elevator_project: boolean;
  metropolitan_area_waiver: string;
  affordability: string;
}

@Injectable()
export class ProjectCharacteristicsService {

  protected projectCharacteristics: BehaviorSubject<IProjectCharacteristics>;
  public projectCharacteristics$: Observable<IProjectCharacteristics>;
  private readonly STORAGE_SPACE: string = 'projectCharacteristics';

  constructor(private storage: LocalStorageService) {
    const lastData = storage.get(this.STORAGE_SPACE) || {};
    this.projectCharacteristics = new BehaviorSubject(lastData);
    this.projectCharacteristics$ = this.projectCharacteristics.asObservable();
  }

  save(projectData: IProjectCharacteristics){
    console.log('ProjectCharacteristicsService', projectData)
    this.storage.put(this.STORAGE_SPACE, projectData);
    this.projectCharacteristics.next(projectData);
  }

}
