import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  images: string[];

  constructor(private storage: Storage) {
    this.images = [];
  }

  ngOnInit() {
    this.getImages();
  }

  uploadImage($event: any){
    const file =  $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);
    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response);
        this.getImages();
      })
      .catch(error => console.log(error));

  }

  getImages() {
    const imagesReff = ref(this.storage, 'images');

    listAll(imagesReff)
    .then(async response => {
      console.log(response);
      this.images = [];
      for(const item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })
    .catch(error => console.log(error));
  }

}
