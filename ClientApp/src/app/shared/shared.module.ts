import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoaderService } from './components/loading-indicator/loader.service';
import { LoaderInterceptor } from './components/loading-indicator/loader-interceptors';
import { HttpResponseHandlerService } from './error-handler/http-response-handler.service';
import { ToastrService } from 'ngx-toastr';
export const COMPONENTS = [
  SpinnerComponent,
  ];
@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,

  ],
  providers: [
    LoaderService,

    { provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true },
  ]
})
export class SharedModule { }
