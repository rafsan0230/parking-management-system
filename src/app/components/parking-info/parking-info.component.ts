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
  oneVehicle?:vehicle;
  selected_title : string ='';

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
  updateForm = this.fb.group({
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
    this.parkingService.getDetails(id).subscribe((res) => {
      console.log(res);
      this.selected_title = res.license
      this.oneVehicle=res;
    })
  }

  update(id:string){
    console.log("update function")
    const {license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge} = this.updateForm.value;
    if(license && type && owner_name && owner_phone && status && car_owner_address && entry_time && exit_time &&parking_charge){
    this.parkingService.editDetails(id,{license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge}).subscribe((res) =>{
      const filteredVehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
      filteredVehicles.push(res);
      console.log('filtered',filteredVehicles);
      this.vehicles=filteredVehicles;
    })
  }
  }
  
  ngOnInit(): void {
    this.parkingService.get().subscribe((res) => {
      console.log(res);
      this.vehicles=res;
    })
  }
  onSubmit(){
    const {license , type, owner_name, owner_phone, status, car_owner_address, entry_time, parking_charge} = this.vehicleForm.value;
    console.log("onsubmit", {license , type, owner_name, owner_phone, status, car_owner_address, entry_time, parking_charge})
    if(license && type && owner_name && owner_phone && status && car_owner_address && entry_time &&parking_charge){
      this.parkingService.create({license , type, owner_name, owner_phone, status, car_owner_address, entry_time, parking_charge}).subscribe((res) => {
        console.log(res);
        this.vehicles.push(res);
      })
    }
  }
}
