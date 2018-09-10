import { Component, ContentChildren, QueryList, Output, EventEmitter, Input, AfterViewInit } from "@angular/core";
import { UbiSlide } from "../ubi-slide/ubi-slide";


export interface SlideChangeEvent {
  newSlideIndex: number;
  oldSlideIndex: number;
  direction: string;
}

@Component({
  selector: 'ubi-slider',
  templateUrl: './ubi-slider.html'
})
export class UbiSlider implements AfterViewInit {
  @ContentChildren(UbiSlide) slides: QueryList<UbiSlide>;

  @Input() autoHeight: boolean;
  @Input() bullets: boolean;
  @Input() dynamicBullets: boolean;
  @Input() bulletSize = 8;

  @Output() slideChange = new EventEmitter<SlideChangeEvent>();

  private activeSlideIndex = 0;
  private directions = {
    LEFT: 2,
    RIGHT: 4
  }

  slideHeight = 0;
  slidesTransform = 0;

  private adjustHeight() {
    const slidesArrray = this.slides.toArray();
    const currentSlide = slidesArrray[this.activeSlideIndex];
    this.slideHeight = currentSlide.height;
  }

  private goToActive() {
    this.slidesTransform = -(100 / this.slides.length) * this.activeSlideIndex;
  }

  get currentIndex() {
    return this.activeSlideIndex;
  }

  ngAfterViewInit() {
    this.adjustHeight();
  }

  onPan(e) {
    const percentage = 100 / this.slides.length * e.deltaX / window.innerWidth;
    const transformPercentage = percentage - 100 / this.slides.length * this.activeSlideIndex;
    this.slidesTransform = transformPercentage;
    if (e.isFinal) {
      console.info(e);
      if (e.offsetDirection === this.directions.LEFT) {
        this.goTo(this.activeSlideIndex + 1);
        return;
      }

      if (e.offsetDirection === this.directions.RIGHT) {
        this.goTo(this.activeSlideIndex - 1);
        return;
      }

      this.goToActive();
    }
  }

  next() {
    this.goTo(this.activeSlideIndex + 1);
  }

  prev() {
    this.goTo(this.activeSlideIndex - 1);
  }

  goTo(index: number) {
    let activeSlideIndex = index;

    if (index < 0) {
      activeSlideIndex = 0;
    }

    if (index > this.slides.length - 1) {
      activeSlideIndex = this.slides.length - 1;
    }

    if (this.activeSlideIndex === activeSlideIndex) {
      this.goToActive();
    } else {
      this.slideChange.emit({
        newSlideIndex: index,
        oldSlideIndex: this.activeSlideIndex,
        direction: index > this.activeSlideIndex ? 'forward' : 'back'
      });

      this.activeSlideIndex = activeSlideIndex;

      this.goToActive();

      if (this.autoHeight) {
        this.adjustHeight();
      }
    }
  };

}
