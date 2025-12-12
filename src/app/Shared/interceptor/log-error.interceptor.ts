import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LogErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log the error details
        console.error('API Error occurred:', {
          timestamp: new Date().toISOString(),
          url: request.url,
          method: request.method,
          status: error.status,
          statusText: error.statusText,
          error: error.error,
          message: error.message,
        });

        // You can also implement custom error logging logic here
        // For example, sending errors to a logging service
        this.logErrorToService(error, request);

        // Rethrow the error to be handled by the component
        return throwError(() => error);
      }),
    );
  }

  private logErrorToService(error: HttpErrorResponse, request: HttpRequest<any>): void {
    // TODO: Implement your custom error logging logic here
    // For example, you could send the error to a logging service
    // or store it in your application's error tracking system

    // Example structure of error data you might want to log
    const errorLog = {
      timestamp: new Date().toISOString(),
      url: request.url,
      method: request.method,
      status: error.status,
      statusText: error.statusText,
      errorMessage: error.message,
      errorDetails: error.error,
      userAgent: navigator.userAgent,
      // Add any other relevant information you want to log
    };

    // You can implement the actual logging logic here
    // For example:
    // this.loggingService.logError(errorLog);
  }
}
