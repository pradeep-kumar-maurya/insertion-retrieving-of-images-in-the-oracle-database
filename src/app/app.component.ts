import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent{

  constructor(private httpClient: HttpClient) { }
  
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  allImages: any;
  image: any = [];
  i:number;

  //Gets called when the user selects an image

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:4545/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
     );
  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:4545/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          //console.log("base64 = "+this.base64Data);
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        error => alert(error.error)
        );
  }

  getAllImages(){
    this.httpClient.get('http://localhost:4545/image/get/All_Images')
    .subscribe(
      res=> {
        //console.log(res);
      this.allImages = res;    
      // console.log(this.allImages[0].picByte);  
      //console.log("Length = "+this.allImages.length);
      for(this.i = 0 ; this.i < this.allImages.length ; this.i++){
        this.base64Data = this.allImages[this.i].picByte;
        //console.log("base64 = "+this.base64Data);
        this.image.push('data:image/jpeg;base64,' + this.base64Data);
      }
    }
    );
  }
}