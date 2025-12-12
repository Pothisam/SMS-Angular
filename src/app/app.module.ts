import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffNavComponent } from './Area/Staff/Shared/Layout/staff-nav/staff-nav.component';
import { CmsNavComponent } from './Area/SMS/Shared/Layout/cms-nav/cms-nav.component';
import { CmsLeftMenuComponent } from './Area/SMS/Shared/Layout/cms-left-menu/cms-left-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FrameworkService } from './Shared/framework/framework.service';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FrameworkModule } from './Shared/framework/framework.module';
import { NoaccessComponent } from './Shared/common/noaccess/noaccess.component';
import { LogErrorInterceptor } from './Shared/interceptor/log-error.interceptor';
import { StaffLeftMenuComponent } from './Area/Staff/Shared/Layout/staff-left-menu/staff-left-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    CmsNavComponent,
    StaffNavComponent,
    CmsLeftMenuComponent,
    StaffLeftMenuComponent,
    NoaccessComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    FrameworkModule,
    FormsModule,
  ],
  providers: [
    FrameworkService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {
  constructor(private eventHandlerService: FrameworkService) {
    this.eventHandlerService.initializeEventHandling();
  }
}
