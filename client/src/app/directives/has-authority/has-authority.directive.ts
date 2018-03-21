import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {UserService} from '../../services/user.service';

@Directive({
  selector: '[appHasAuthority]'
})
export class HasAuthorityDirective {

  private authorities: string[];

  constructor(private userService: UserService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
  }

  @Input()
  set appHasAuthority(value: string|string[]) {
    this.authorities = typeof value === 'string' ? [ <string> value ] : <string[]> value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.userService.getAuthenticationState().subscribe((identity) => this.updateView());
  }

  private updateView(): void {
    this.userService.hasAnyAuthority(this.authorities).then((result) => {
      this.viewContainerRef.clear();
      if (result) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
