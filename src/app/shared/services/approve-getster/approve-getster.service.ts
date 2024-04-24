import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApproveGetsterService {
  clickMe = new EventEmitter();

  getExistingGetster() {
    // console.log('call success');
    this.clickMe.emit();
  }
}
