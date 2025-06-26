import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollFade]'
})
export class ScrollFadeDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll')
  onScroll() {
    const pos = this.el.nativeElement.getBoundingClientRect().top;
    const windowH = window.innerHeight;
    if (pos < windowH - 100) {
      this.el.nativeElement.classList.add('visible');
    }
  }

  ngAfterViewInit() { this.onScroll(); }
}
