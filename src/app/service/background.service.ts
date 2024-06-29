import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setBackgroundImage(imageUrl: string) {
    imageUrl = '../../assets/Cover-Page.png';

    this.renderer.setStyle(
      document.body,
      'backgroundImage',
      `url(${imageUrl})`
    );
    this.renderer.setStyle(document.body, 'backgroundSize', 'cover');
  }
}
