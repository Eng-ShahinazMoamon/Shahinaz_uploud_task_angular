import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadedService } from 'src/app/services/upload_service/uploaded.service';
import { uploadView } from 'src/app/services/upload_service/uploadViewModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  getAll: uploadView[];
  searchFilter: string;
  constructor(private fileSrc: UploadedService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getAllList();
  }


  getAllList() {
    this.fileSrc.GetAllFile().subscribe(data => {
      this.getAll = data as uploadView[]
      for (let e of this.getAll) {
       console.log(e);
      }
    },

      err => {
        if (err.status == 0) {
          this.router.navigate(['/access']);
        }
      });
  }

  DeleteItem(id: number) {
    this.fileSrc.DeleteFile(id).subscribe(data => {
      console.log("Successfully Delete");
      this.ngOnInit();

    },
      err => {
          alert("Sorry Can't Delete Unexpected Action During Opration");
        

      });

  }
}

