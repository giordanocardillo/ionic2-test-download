import { Component, ElementRef, Self } from "@angular/core";

@Component({
  selector: 'ubi-slide',
  templateUrl: './ubi-slide.html'
})
export class UbiSlide {
  constructor(@Self() private element: ElementRef) { }

  get height(): number {
    return this.element.nativeElement.offsetHeight;
  }
}