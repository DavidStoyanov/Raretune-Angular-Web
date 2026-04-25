import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-latest-pers-song-card-item',
  imports: [],
  templateUrl: './latest-pers-song-card-item.html',
  styleUrl: './latest-pers-song-card-item.scss',
})
export class LatestPersSongCardItem {
    @Input() index!: number; 
}
