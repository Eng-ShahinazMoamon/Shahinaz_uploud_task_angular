import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './component/home/home/home.component';
import { UploadFileComponent } from './component/upload/upload-file/upload-file.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './component/header/header/header.component';
import { DescriptionComponent } from './component/description/description.component';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadFileComponent,
    HeaderComponent,
    DescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbModule,
    SafePipeModule    

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
