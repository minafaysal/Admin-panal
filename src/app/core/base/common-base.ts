import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({
  selector: '[appComponentBase]',
})
export abstract class ComponentBase implements OnDestroy {
  destroy$ = new Subject<void>();
  loading: boolean = false;
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
