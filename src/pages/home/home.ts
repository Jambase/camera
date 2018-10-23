import { Flashlight } from '@ionic-native/flashlight';
import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
  isOn: boolean = false;
 public photos : any;
 public base64Image : string;
 constructor(public navCtrl: NavController,private camera: Camera,private alertCtrl : AlertController,private flashlight:Flashlight) {}
 ngOnInit() {
   this.photos = [];
 }


 takePhoto(){
   const options : CameraOptions = {
     quality: 100, // picture quality
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     correctOrientation:true,
     saveToPhotoAlbum:true
   }


   this.camera.getPicture(options) .then((imageData) => {
     this.base64Image = "data:image/jpeg;base64," + imageData;
     this.photos.push(this.base64Image);
     this.photos.reverse();
   }, (err) => {
     console.log(err);
   });
}
deletePhoto(index) {
 this.photos.splice(index, 1);
let confirm =this.alertCtrl.create({
 title: 'Sure you want to delete this photo?',
 message:'',
 buttons:[
   {
     text: 'No',
     handler: () => {
       console.log('Disagree clicked');
     }
   },{
     text: 'Yes',
     handler: () =>{
       console.log('Agree clicked');
           this.photos.splice(index, 1);
     }
   }
 ]
});
confirm.present();
}

Gallery(){
 const options : CameraOptions = {
   quality: 100, // picture quality
   destinationType: this.camera.DestinationType.DATA_URL,
   sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
   encodingType: this.camera.EncodingType.JPEG,
   mediaType: this.camera.MediaType.PICTURE,
   correctOrientation:true,
   saveToPhotoAlbum:true
 }
 this.camera.getPicture(options) .then((imageData) => {
   this.base64Image = "data:image/jpeg;base64," + imageData;
   this.photos.push(this.base64Image);
   this.photos.reverse();
 }, (err) => {
   console.log(err);
 });
 }
 async isAvailable():Promise<boolean>{
   try{
     return await this.flashlight.available();
    //  console.log(available)
    //  return available;
   }
   catch(e){
     console.log(e);

   }
  }

  async toggleFlash():Promise<void>{
    try{
      let available = await this.isAvailable();
      if(available){
        await this.flashlight.toggle();
        this.isOn = !this.isOn;
      }
      else{
        console.log("isn't available");
      }
    }
    catch(e){
      console.log(e)
    }

  }

  async turnOnflash():Promise<void>{
    await this.flashlight.switchOn();
  }
  async turnOffflash():Promise<void>{
    await this.flashlight.switchOff();
  }

  async isFlashOn():Promise<boolean>{
    return await this.flashlight.isSwitchedOn();
  }
}