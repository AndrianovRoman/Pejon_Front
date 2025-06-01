import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokens = this.authService.getTokens();
    // console.log(tokens)
    if (tokens && tokens.token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${tokens.token}`)
      });

      return next.handle(authReq)
    } else {
      return next.handle(req)
    }
  }
}
