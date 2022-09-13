import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/components/interfaces';
import { PostService } from '../shared/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private postService: PostService) { }
  post$: Observable<Post[]>

  ngOnInit(): void {
    this.post$ = this.postService.getAll()
  }

}
