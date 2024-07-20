import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [NotFoundComponent, TruncatePipe, SearchPipe],
  imports: [CommonModule, SharedRoutingModule],
  exports: [TruncatePipe, SearchPipe],
})
export class SharedModule {}
