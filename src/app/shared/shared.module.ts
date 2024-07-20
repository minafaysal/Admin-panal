import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [NotFoundComponent, TruncatePipe],
  imports: [CommonModule, SharedRoutingModule],
  exports: [TruncatePipe],
})
export class SharedModule {}
