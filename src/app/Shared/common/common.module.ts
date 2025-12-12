import { NgModule } from '@angular/core';
import { PrintHeaderComponent } from './PrintHeader/PrintHeader.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [MaterialModule],
  declarations: [PrintHeaderComponent],
  exports: [PrintHeaderComponent, MaterialModule],
})
export class commonModule {}
