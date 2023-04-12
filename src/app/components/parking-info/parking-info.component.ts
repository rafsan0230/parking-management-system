import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { vehicle } from 'src/app/interfaces/vehicles';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-parking-info',
  templateUrl: './parking-info.component.html',
  styleUrls: ['./parking-info.component.css']
})
export class ParkingInfoComponent implements OnInit{
  vehicles:vehicle[]=[];

  constructor(private fb:FormBuilder, private parkingService: ParkingService){}

  vehicleForm = this.fb.group({
    license : '',
    type : '',
    owner_name : '',
    owner_phone : '',
    status : '',
    car_owner_address : '',
    entry_time : '',
    exit_time : '',
    parking_charge: 50
  })

  edit(id:string){
    
  }
  
  ngOnInit(): void {
    this.parkingService.get().subscribe((res) => {
      console.log(res);
      this.vehicles=res;
    })
  }
  onSubmit(){
    const {license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge} = this.vehicleForm.value;
    console.log("onsubmit", {license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge})
    if(license && type && owner_name && owner_phone && status && car_owner_address && entry_time && exit_time &&parking_charge){
      this.parkingService.create({license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge}).subscribe((res) => {
        console.log(res);
        this.vehicles.push(res);
      })
    }
  }
}
