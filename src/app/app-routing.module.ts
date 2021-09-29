import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './component/description/description.component';
import { HomeComponent } from './component/home/home/home.component';
import { UploadFileComponent } from './component/upload/upload-file/upload-file.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  { path:'new-file/:id', component: UploadFileComponent },
  { path:'new-file/:id/:eid', component: DescriptionComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
