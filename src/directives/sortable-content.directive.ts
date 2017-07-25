import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  Output,
  Component,
  EventEmitter
} from '@angular/core';
import { database } from 'firebase';

/**
 * Creates components provided by user
 */

@Directive({
  selector: '[ngfbSortableContent]'
})
export class SortableContentDirective {
  @Output() private onEvent?: EventEmitter<any> = new EventEmitter<any>();
  @Input() private index?: number;
  @Input() private ref?: database.DataSnapshot;
  @Input() set component(data: Component) {
    const factory = this.resolver.resolveComponentFactory(data as any);
    const instance = this.viewContainer.createComponent(factory, 0).instance;
    if (this.index) instance['index'] = this.index;
    if (this.ref) instance['ref'] = this.ref;
    if (instance['emitEvent']) {
      instance['emitEvent'].subscribe(
        (event: number) => this.onEvent.emit(event)
      );
    }
  }
  constructor(
      private viewContainer: ViewContainerRef,
      private resolver: ComponentFactoryResolver
  ) {}
}