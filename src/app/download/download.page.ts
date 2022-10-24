import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, deleteObject, getStorage } from '@angular/fire/storage';
import { reload } from '@firebase/auth';
import { Console } from 'console';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  images: string[];

  constructor(private storage: Storage) {
    this.images = [];
  }

  ngOnInit() {
    this.getImages();
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);
    uploadBytes(imgRef, file)
      .then((response) => {
        console.log(response);
        this.getImages();
      })
      .catch((error) => console.log(error));
  }

  getImages() {
    const imagesReff = ref(this.storage, 'images');

    listAll(imagesReff)
      .then(async (response) => {
        console.log(response);
        this.images = [];
        for (const item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch((error) => console.log(error));
  }

  deleteImages() {
    const storage = getStorage();

    // Create a reference to the file to delete
    const ndel = document.getElementById('delete');
    const desertRef = ref(storage, this.images[0]);

    // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log('File Delete');// File deleted successfully
      window.location.reload();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  }
}
