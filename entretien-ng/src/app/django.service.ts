import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DjangoService {

  path = "/api/"

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(this.path);
  }

  render_json(data) {
    return this.http.post(this.path + "json", data);
  }
}
