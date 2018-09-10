import { Component } from "@angular/core";

@Component({
  selector: 'page-slider',
  templateUrl: './slider.html'
})
export class SliderPage {
  sliders = Array(40).fill(0);
  slides = [];
  headerValue = "Ciao";

  constructor() {
    for (let i = 0; i < 6; i++) {
      this.slides.push((i % 6) * 0.1 * (310 - 180 + 1) + 180);
    }
  }

  onSlideChange(e) {
    console.info('Slide changed', e);
  }
}