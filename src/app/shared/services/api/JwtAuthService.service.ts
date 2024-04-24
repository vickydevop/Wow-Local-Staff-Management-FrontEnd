/*
https://docs.nestjs.com/providers#services
*/

// import { Injectable } from '@angular/core';

@Injectable()
export class JwtAuthServiceService {}
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  return!: string;

  constructor(private route: ActivatedRoute) {
    localStorage.setItem(
      'access_token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImdldHN0ZXJfaWQiOjExLCJyZWdpc3RlcmVkX21vYmlsZV9jb3VudHJ5X2NvZGUiOiI5MSIsInJvbGVzIjoiYWRtaW4iLCJ0aW1lX3pvbmVfaWFuYV9zdHJpbmciOiJBc2lhL0tvbGthdGEiLCJwcmV2aW91c19sb2dpbl9pbWFnZV9vZl90aGVfZGF5X2NlcGhfb2JqZWN0X2lkIjoiNTc3LmpwZWcifSwiaWF0IjoxNjg0NzM5ODUzLCJleHAiOjMyODQ3Mzk4NTN9.OdyEJ2DZ4UOVheP0DlKi4sZPLdF773a4w1BtoTGeuvU'
    );

    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {
    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      }),
    };

    return HTTP_OPTIONS;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
}
