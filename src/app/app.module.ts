import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaksListComponent } from './components/taks-list/taks-list.component';
import { FormsModule } from '@angular/forms';
import { TaskServiceLocalStorageImplementationService } from './services/task-service-local-storage-implementation.service';
import { TaskServiceAbstractService } from './services/task-service-abstract.service';

@NgModule({
  declarations: [AppComponent, TaksListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    {
      provide: TaskServiceAbstractService,
      useClass: TaskServiceLocalStorageImplementationService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
