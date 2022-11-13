import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { PostDetailRoutingModule } from './post-detail-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [PostDetailRoutingModule, CommonModule, MatCardModule],
})
export class PostDetailModule {}
