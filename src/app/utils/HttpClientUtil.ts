import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable()
export class HttpClientUtil {

    constructor(private http: HTTP) { }

    public async executeRequest(endpoint: string, userAgent: string, timeoutMillis: number): Promise<any> {
        //Random user agent's are not working
        this.http.setHeader("https://localhost.com", "User-Agent", userAgent);
        this.http.setRequestTimeout(timeoutMillis);
        return this.http.get(endpoint,{},{});
    }
}