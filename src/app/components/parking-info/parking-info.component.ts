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
  total_parking_slot:number = 50;
  vehicles:vehicle[]=[];
  parkedVehicles:number=0;
  cars:vehicle[]=[];
  microbuses:vehicle[]=[];
  trucks:vehicle[]=[];
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
    const {license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge} = this.updateForm.value;
    console.log({license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge});
    if(license && type && owner_name && owner_phone && status && car_owner_address && entry_time && exit_time &&parking_charge){
    this.parkingService.editDetails(id,{license , type, owner_name, owner_phone, status, car_owner_address, entry_time, exit_time, parking_charge}).subscribe((res) =>{
      const filteredVehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
      filteredVehicles.push(res);
      console.log('filtered',filteredVehicles);
      this.vehicles=filteredVehicles;
    })
    this.ngOnInit();
  }
  }
  
  ngOnInit(): void {
    this.parkingService.get().subscribe((res) => {
      // console.log(res);
      this.vehicles=res;
      const parked = this.vehicles.filter(vehicle => vehicle.exit_time? console.log('oninit') : this.parkedVehicles++);
      // this.parkedVehicles=parked;
      const carVehicle = this.vehicles.filter(vehicle => vehicle.type === 'Car');
      this.cars=carVehicle;
      const microbusVehicle = this.vehicles.filter(vehicle => vehicle.type === 'MicroBus');
      this.microbuses=microbusVehicle;
      const truckVehicle = this.vehicles.filter(vehicle => vehicle.type === 'Truck');
      this.trucks=truckVehicle;
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
