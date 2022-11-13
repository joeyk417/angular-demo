import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDefinitionService } from '@ngrx/data';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { postsEntityMetaData } from '../store/post-entity-metadata';
import { usersEntityMetaData } from '../store/user-entity-metadata';
import { HomeRoutingModule } from './home-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxPaginationModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class HomeModule {
  constructor(entityDefinitionService: EntityDefinitionService) {
    entityDefinitionService.registerMetadataMap(postsEntityMetaData);
    entityDefinitionService.registerMetadataMap(usersEntityMetaData);
  }
}
