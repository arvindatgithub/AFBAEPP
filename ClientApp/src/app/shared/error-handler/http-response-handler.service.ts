import { Injectable } from '@angular/core';
//import { Message } from 'primeng/components/common/message';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpResponseHandlerService {
  //public msgs: Message[] = [];
  constructor(
    private router: Router,
    private notificationsService: ToastrService,
    ) {}

  private showNotificationError(title: string, message: string): void {
   // this.msgs.push({ severity: 'error', summary: message, detail: '' });


  }

  public onCatch(response: any): Observable<any> {
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError();
        break;
      case 0:
        this.handleServerError();
        break;

      default:
        break;
    }

    // return Observable.throw(response);
    return throwError(response);
  }
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError();
      }
    } else { this.handleServerError(); }
  }

  private handleUnauthorized(responseBody: any): void {
    // this.notificationsService.info('Info', 'Access not allowed. Please login.');
    // this.router.navigate(['/login']);
  }

  private handleForbidden(): void {
    // this.notificationsService.error('error', 'Access forbidden. Please provide correct credentials');
    // this.router.navigate(['/login']);
  }

  private handleNotFound(responseBody: any): void {
    this.notificationsService.error('error', 'An error occurred. Please contact your administrator');
  }
  private handleErrorMessages(response: any): void {
    if (!response) { return; }

    for (const key of Object.keys(response)) {
      if (Array.isArray(response[key])) {
        response[key].forEach((value) => this.showNotificationError('Error', value));
      } else { this.showNotificationError('Error', response[key]); }
    }
  }

  private handleServerError(): void {
    const message = 'An error occurred. Please contact your administrator';
    const  title = 'Error';

    this.notificationsService.error('error', 'Access forbidden. Please provide correct credentials');
    this.showNotificationError(title, message);
  }

}
