import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IframeService } from './shared/services/iframe/iframe.service';
import { StyleManager } from './shared/services/style-manager/style-manager.service';
declare var GoogleTranslate: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @HostListener('document:mousemove')
  @HostListener('document:click')
  @HostListener('document:keydown')
  resetIdleTimeout() {
    this.sendMessage('is_idle_active', this.baseOrigin);
  }

  @HostListener('window:unload')
  unloadHandler() {
    localStorage.clear();
    this.clearCookies();
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  baseOrigin: string = 'https://manage.getster.tech';
  // baseOrigin: string = 'http://localhost:4200';
  isLoaded: boolean = true;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _iframeService: IframeService,
    private styleManager: StyleManager,
    private _cdf: ChangeDetectorRef
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit() {



    localStorage.setItem(
      'access_token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImdldHN0ZXJfaWQiOjExLCJyZWdpc3RlcmVkX21vYmlsZV9jb3VudHJ5X2NvZGUiOiI5MSIsInJvbGVzIjoiYWRtaW4iLCJ0aW1lX3pvbmVfaWFuYV9zdHJpbmciOiJBc2lhL0tvbGthdGEiLCJwcmV2aW91c19sb2dpbl9pbWFnZV9vZl90aGVfZGF5X2NlcGhfb2JqZWN0X2lkIjoiNTc3LmpwZWcifSwiaWF0IjoxNjg0NzM5ODUzLCJleHAiOjMyODQ3Mzk4NTN9.OdyEJ2DZ4UOVheP0DlKi4sZPLdF773a4w1BtoTGeuvU'
    );


    this.clearCookies();

    this._iframeService.getIframeData.subscribe({
      next: (next) => {
        if (next) {
          this.styleManager.toggleDarkTheme(next.dark);
          setTimeout(() => {
            GoogleTranslate(next.googleTranslate);
          }, 1000);
        }
      },
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    GoogleTranslate('en');
    // }, 2000);
    this.clearCookies();

    this.iframeLoaded();
  }

  ngOnDestroy() {
    localStorage.clear();

    this.clearCookies();
  }
  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  iframeLoaded() {
    window.addEventListener('message', (e) => {
      if (e.origin == this.baseOrigin) {
        let parentData = JSON.parse(JSON.parse(JSON.stringify(e.data)));

        for (const key in parentData) {
          if (Object.prototype.hasOwnProperty.call(parentData, key)) {
            const value = parentData[key];
            localStorage.setItem(key, value);
          }
        }

        this.isLoaded = true;
        this._iframeService.sendIframeData(parentData);
        this._cdf.detectChanges();
        // this.sendMessage('Received From Child', e.origin);
      }
    });

    // Send data to parent message first time
    window.addEventListener('load', (e) => {
      this.sendMessage('Connected Successful.', this.baseOrigin);
      this._cdf.detectChanges();
    });
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    // window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }

  clearCookies() {
    const cookies = document.cookie.split(';');
    const domain = window.location.hostname;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${domain};path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${'.getster.tech'};SameSite=None;Secure`;
    }
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
