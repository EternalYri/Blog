import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../shared/components/interfaces';
import { PostService } from '../shared/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  constructor(public posts: PostService, private route: ActivatedRoute) { }
  post$: Observable<Post>

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params)=>{
      return this.posts.getById(params['id'])
    }))
  }

}
