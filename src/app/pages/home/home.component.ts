import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { PostService } from './../../shared/services/post.service';
import { User } from '../../shared/models/user';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Post } from '../../shared/models/posts';

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
  loading$: Observable<boolean>;

  private allPosts$: Observable<Post[]>;
  private allUsers$: Observable<User[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading$ = this.postService.loading$;
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
