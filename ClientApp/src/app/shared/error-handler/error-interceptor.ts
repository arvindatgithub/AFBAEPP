import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpResponseHandlerService } from './http-response-handler.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor  {

  constructor(private router: Router, private notificationsService: ToastrService) { }

intercept(req: HttpRequest<any>, next: HttpHandler):
Observable<HttpEvent<any>> {
      return next.handle(req)
       .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          switch (errorResponse.status) {
            case 400:
              this.notificationsService.info('Info', 'Bad Request. Please provide correct data');
              break;
            case 401:
              //this.notificationsService.info('Info', 'Access not allowed. Please login.');
              //this.router.navigate(['/login']);
              break;
            case 403:
              //this.notificationsService.error('error', 'Access forbidden. Please provide correct credentials');
              //this.router.navigate(['/login']);
              //break;
            case 404:
                this.notificationsService.error('error', 'An error occurred. Please contact your administrator');
                break;
            case 500:
              //this.notificationsService.error('Error', 'Access forbidden. Please provide correct credentials');
              //this.router.navigate(['/login']);
              break;
            case 0:
              //this.notificationsService.error('Error', 'An error occurred. Please contact your administrator');
              //break;
            default:
              break;
            }

          return throwError(errorResponse);
        })
       );
     }

}
