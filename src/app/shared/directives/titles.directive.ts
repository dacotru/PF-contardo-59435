import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitles]'
})
export class TitlesDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.fontSize = '20px';
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.color = 'rgb(15 31 63)';
  }
}
