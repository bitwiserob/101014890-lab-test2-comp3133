import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent {
  @Input() mission: any; // The selected mission passed from the parent component

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Get the mission details from the API using the flight_number parameter
    const flight_number = this.route.snapshot.paramMap.get('flight_number');
    this.http.get(`https://api.spacexdata.com/v3/launches/${flight_number}`).subscribe(
      (response) => {
        this.mission = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
