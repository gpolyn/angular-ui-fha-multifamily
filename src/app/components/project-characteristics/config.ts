import { OpaqueToken } from '@angular/core';

export const INITIAL_CONFIG = {
  is_elevator_project: 'false',
  metropolitan_area_waiver: 'standard waiver',
  affordability: 'market'
};

export let PROJECT_CONFIG = new OpaqueToken('app.projectCharacteristics.initialConfig');
