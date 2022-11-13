import { Post } from './../../pages/store/posts';

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { concatMap, filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService extends EntityCollectionServiceBase<Post> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Post', serviceElementsFactory);
  }

  public getAllPosts(): Observable<Post[]> {
    return this.loaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) this.getAll();
      }),
      filter((loaded: boolean) => loaded),
      concatMap(() => this.entities$.pipe())
    );
  }

  public getPostById(id: number): Observable<Post | undefined> {
    return this.getAllPosts().pipe(
      map((posts) => posts.find((p) => p.id === id))
    );
  }
}
