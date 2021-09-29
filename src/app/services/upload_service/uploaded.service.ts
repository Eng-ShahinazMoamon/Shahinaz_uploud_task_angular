import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { uploadView } from './uploadViewModel';

@Injectable({
  providedIn: 'root'
})
export class UploadedService {
  
  constructor(private http :HttpClient) { }

  GetAllFile() {
    return this.http.get(`${environment.Api}/File`);
  }
  
  postNewFile (view : FormData)
  {
    return this.http.post(`${environment.Api}/File/`,view)
  }

  
  GetFileById(id: number ):Observable<any> {

    return this.http.get(`${environment.Api}/File/${id}`)
  }

  //Update ....Update Item in Api
  UpdateFile(id: number, view: uploadView) {

    return this.http.put(`${environment.Api}/File/${id}`, view)
  }
  //Delete ....Delete Item from Api
  DeleteFile(id: number) {

    return this.http.delete(`${environment.Api}/File/${id}`);
  }

}