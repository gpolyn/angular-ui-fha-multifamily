import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  private readonly storageId = 'income-angularjs-typescript';

	get (member: string): any {
    const data = JSON.parse(localStorage.getItem(this.storageId) || '{}');
    return data[member] || {};
	}

	put(member: string, memberData: any) {
    const data = JSON.parse(localStorage.getItem(this.storageId) || '{}');
    data[member] = memberData;
    localStorage.setItem(this.storageId, JSON.stringify(data));
	}
  
}
