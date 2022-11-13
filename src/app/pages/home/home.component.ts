import { UserService } from './../../shared/services/user.service';
import { PostService } from './../../shared/services/post.service';
import { User } from '../store/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
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

  getAllPosts() {
    if (this.userNameEntered) this.userNameEntered = '';

    this.subscriptions.push(
      this.allPosts$.subscribe((posts: Post[]) => {
        this.allPosts = posts;
      })
    );
  }

  getPostDetails(id: number) {
    this.router.navigate(['postdetails', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  searchUser() {
    this.allPosts = [];
    const data$ = combineLatest([
      this.allUsers$.pipe(
        map((txs) => txs.find((txn) => txn.username === this.userNameEntered))
      ),
      this.allPosts$,
    ]);

    this.subscriptions.push(
      data$.subscribe(([res1, res2]) => {
        res2.forEach((element) => {
          if (element) {
            if (element.userId === res1?.id) {
              this.allPosts.push(element);
            }
          }
        });
      })
    );
  }
}
