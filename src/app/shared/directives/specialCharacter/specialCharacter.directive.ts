import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[specialIsAlphaNumeric]',
})
export class SpecialCharacterDirective {
  regexStr = '^[a-zA-Z0-9 _]*$';
  @Input() isAlphaNumeric!: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    alert('c');
    this.validateFields(event);
  }

  validateFields(event: any) {
    setTimeout(() => {
      alert(this.el.nativeElement.value);
      this.el.nativeElement.value = this.el.nativeElement.value
        .replace(/[^A-Za-z ]/g, '')
        .replace(/\s/g, '');
      event.preventDefault();
    }, 1);
  }
}
