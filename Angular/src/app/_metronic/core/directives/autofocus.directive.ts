import { ElementRef, OnInit, Directive } from '@angular/core';


@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }

}
