import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadedService } from 'src/app/services/upload_service/uploaded.service';
import { uploadView } from 'src/app/services/upload_service/uploadViewModel';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  view: uploadView = new uploadView();
  id: number;
  eid: number;
  testUrl:any
  constructor(private upSrc: UploadedService, private route: ActivatedRoute,
    private router:Router) { 
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.eid = +params['eid']; // (+) converts string 'id' to a number         
      console.log(this.id, this.eid);
    });
// this.testUrl='../../../assets/logo.png';
  }

  ngOnInit(): void {
  
  this.upSrc.GetFileById(this.eid).subscribe(res => {
    //debugger
    this.view = res as uploadView
    console.log(this.view);
    var x=this.view.documentURL;
    this.testUrl=`https://localhost:44386/${this.view.documentURL}`
    this.getURL(this.view.documentURL)
    console.log(x)
    
  })
}
getURL(e){
  debugger;
  let x=`https://localhost:44386/`+e
  return  `https://localhost:44386/`+this.testUrl;
}
onPrint(){
  window.print();

}
}
