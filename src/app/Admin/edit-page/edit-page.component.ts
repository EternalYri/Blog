import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/components/interfaces';
import { PostService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private postService: PostService, private alert: AlertService) { }
  ngOnDestroy() {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  form: FormGroup;
  post: Post;
  submited = false;
  uSub: Subscription;

  submit() {
    if(this.form.invalid) {
      return
    }
    this.submited = true;
    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(()=>{
      this.submited = false;
    })
    this.alert.warning('Пост был изменен!')
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params)=>{
      return this.postService.getById(params['id'])
    })).subscribe((post: Post)=>{
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

}
