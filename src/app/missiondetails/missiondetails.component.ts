import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SpacexapiService } from '../spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent {
  @Input() mission: any; 

  constructor(
    private route: ActivatedRoute,
    private spx: SpacexapiService
  ) {}

  ngOnInit() {
    
    const flight_number = this.route.snapshot.paramMap.get('flight_number');
    // this.http.get(`https://api.spacexdata.com/v3/launches/${flight_number}`).subscribe(
    //   (response) => {
    //     this.mission = response;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

    if(flight_number){
      this.spx.getLaunch(flight_number).subscribe(
        (response) => {
          this.mission = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }

  }
}
