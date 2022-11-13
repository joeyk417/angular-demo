import { UserService } from './../../shared/services/user.service';
import { PostService } from './../../shared/services/post.service';
import { User } from '../store/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subscription,
  switchMap,
  filter,
} from 'rxjs';
import { Post } from '../store/posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pages: number = 1;
  userNameEntered: string = '';
  allPosts: Post[] = [];
  userid: number = 0;

  private allPosts$: Observable<Post[]>;
  private allUsers$: Observable<User[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allPosts$ = this.postService.getAllPosts();
    this.allUsers$ = this.userService.getAllUsers();

    this.getAllPosts();
  }

  public getAllPosts() {
    if (this.userNameEntered) this.userNameEntered = '';

    this.subscriptions.push(
      this.allPosts$.subscribe((posts: Post[]) => {
        this.allPosts = posts;
      })
    );
  }

  public getPostDetails(id: number) {
    this.router.navigate(['postdetails', id]);
  }

  public searchByUsername() {
    const currentUser$ = this.allUsers$.pipe(
      map((users) => users.find((u) => u.username === this.userNameEntered))
    );

    const result$ = combineLatest([currentUser$, this.allPosts$]).pipe(
      map(([user, posts]) => {
        return posts.filter((p) => p.userId === user?.id);
      })
    );

    this.subscriptions.push(
      result$.subscribe((posts) => (this.allPosts = posts))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
