import { Injectable } from '@angular/core';
import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  Pluralizer,
} from '@ngrx/data';
@Injectable()
export class CustomurlHttpGenerator extends DefaultHttpUrlGenerator {
  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }

  protected override getResourceUrls(entityName: string): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];
    if (entityName == 'Post') {
      resourceURLs = {
        collectionResourceUrl: 'https://jsonplaceholder.typicode.com/posts/',
        entityResourceUrl: 'https://jsonplaceholder.typicode.com/posts/',
      };
      this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    }
    if (entityName == 'User') {
      resourceURLs = {
        collectionResourceUrl: ' https://jsonplaceholder.typicode.com/users/',
        entityResourceUrl: ' https://jsonplaceholder.typicode.com/users/',
      };
      this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    }
    return resourceURLs;
  }
}
