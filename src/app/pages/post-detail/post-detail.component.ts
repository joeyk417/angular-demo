import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './../../shared/services/user.service';
import { PostService } from './../../shared/services/post.service';
import { Post } from './../store/posts';
import { Observable, switchMap } from 'rxjs';
import { User } from '../store/user';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  body: string = '';
  username: string = '';
  userFullName: string = '';
  id: number = 0;
  title: string = '';

  post$: Observable<Post | undefined>;
  user$: Observable<User | undefined>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId');

    if (postId) {
      this.post$ = this.postService.getPostById(Number(postId));
      this.user$ = this.post$.pipe(
        switchMap((post) => this.userService.getUserById(post!.userId))
      );
    }
  }

  public backClicked() {
    this.location.back();
  }
}
