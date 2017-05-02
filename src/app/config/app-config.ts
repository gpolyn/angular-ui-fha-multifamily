import { OpaqueToken } from '@angular/core';

export const GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
});

export const CURRENT_AUTHOR_ID = new OpaqueToken('some_guid');

export interface IAppConfig {
  maxCommercialOccupancy: number;
  maxResidentialOccupancy: number;
}

export const DI_CONFIG: IAppConfig = {
  maxCommercialOccupancy: 80,
  maxResidentialOccupancy: 95
};

export let APP_CONFIG = new OpaqueToken('app.config');
