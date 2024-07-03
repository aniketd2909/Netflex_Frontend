import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss',
})
export class CoverComponent {
  @Input() backgroundUrl: string = '';
  //backgroundUrl: string = 'assets/scroll-page.png';
  ngOnInit() {}
}
