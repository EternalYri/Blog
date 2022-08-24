import { HttpClient } from "@angular/common/http";
import { TmplAstRecursiveVisitor } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "./components/interfaces";

@Injectable({providedIn: 'root'})

export class PostService{
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
  }

}
