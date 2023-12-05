import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatCardComponent } from '../ui/cat-card/cat-card.component';
import { HeaderComponent } from '../../shared/ui/header.component';
import { CatStateService } from '../../adoption/data-access/services/cat.service';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [CatCardComponent, HeaderComponent, JsonPipe],
  selector: 'cat-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cat-header></cat-header>
    @if( result() ; as result ){ @if(result.isLoading){
    <p>loading</p>
    } @if(result.isSuccess){ @for( cat of result.data ;track cat.id){

    <cat-card [cat]="cat"></cat-card>
    } } @if(result.isError){
    <p>failed</p>
    } }
  `,
})
export class HomeComponent {
  #catStateService = inject(CatStateService);
  result = this.#catStateService.findAll().result;
}
