import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../modules/local-staff-management/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private dialog:MatDialog,
    private router:Router
    ) { }
  headerPosition: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.headerPosition = true;
    } else {
      this.headerPosition = false;
    }
  }

  checkGetsterCategoryId() {
    const dialogRef = this.dialog
      .open(LoginComponent, {
        disableClose: true,
        width: '450px',
        height: '591px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res == true) {
          this.router.navigateByUrl('login-page');
          console.log(sessionStorage.getItem('name'));
        }
      });
  }



  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

    const val = sessionStorage.getItem('name');
    if (val == null) {
      this.checkGetsterCategoryId();
    }
  }
}
