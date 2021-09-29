import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadedService } from 'src/app/services/upload_service/uploaded.service';
import { uploadView } from 'src/app/services/upload_service/uploadViewModel';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  view: uploadView = new uploadView();
  id: number;
  eid: number;
  constructor(private upSrc: UploadedService,private _sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router:Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.eid = +params['eid']; // (+) converts string 'id' to a number         
      console.log(this.id, this.eid);
    });

  }

  ngOnInit(): void {
    if(this.id==2){
      document.getElementById('btn').style.display = "none";
      document.getElementById('head').innerHTML = "File Data";
      document.getElementById('print').innerHTML = "Print";


    }
    if(this.id==1){

      document.getElementById('btn').innerHTML = "Edit";
      document.getElementById('head').innerHTML = "Edit File Data";

    }
    if(this.id==0){

      document.getElementById('print').style.display = "none";


    }
    if (this.id != 0) {
      this.upSrc.GetFileById(this.eid).subscribe(res => {
        this.view = res as uploadView
        console.log(this.view);
        console.log(this.view.documentURL);
        
       // this.imgURL = 'data:image/jpg;base64,' + (this._sanitizer.bypassSecurityTrustResourceUrl(this.view.DocumentURL) as any).changingThisBreaksApplicationSecurity;
      })
    }
  }
onPrint(){
  window.print();

}
  onSave() {
    //0==add --- 1==edit --- 2==view
   // debugger
    if (this.id == 0) {
      const fb: FormData = new FormData();
      if(this.fileToUpload==null){
       alert("Please Must Uploud File ")
      }
      fb.append('DocumentTitle', this.view.documentTitle)
      fb.append('DocumentDescription', this.view.documentDescription)
      fb.append('File', this.fileToUpload, this.fileToUpload.name);
  
      console.log(this.fileToUpload);
      console.log(this.view.documentURL);

      this.upSrc.postNewFile(fb).subscribe(res => {
        this.view = new uploadView();
        console.log(fb)
        this.router.navigateByUrl('/home');

      },  err => {
        if (err.status == 0) {
          this.router.navigate(['/access']);
        }
        else{
          alert(" Unavaliable File Extention Or Existing File Name")

        }
      }
      );
    }
  }

  imageUrl: string;
  getImageUrl: string = this.view.documentURL;
  fileToUpload: File = null;

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList;
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.getImageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload + "______" + this.fileToUpload.name)
  }

  // Preview Image in html
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null ) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
