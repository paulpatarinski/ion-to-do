import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[onFocus]',
})

export class OnFocusDirective {
    private el: ElementRef;

    constructor(private _el: ElementRef, public renderer: Renderer) {
        this.el = this._el;
    }

    @HostListener('focus', ['$event']) onFocus(e) {
        this.renderer.setElementClass(this._el.nativeElement, 'show-clear-btn', true);
        this.renderer.setElementClass(this._el.nativeElement, 'hide-clear-btn', false);
        return;
    }
    @HostListener('blur', ['$event']) onblur(e) {
        this.renderer.setElementClass(this._el.nativeElement, 'show-clear-btn', false);
        this.renderer.setElementClass(this._el.nativeElement, 'hide-clear-btn', true);
        return;
    }
}