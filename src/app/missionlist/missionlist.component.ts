import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { SpacexapiService } from '../spacexapi.service';
@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
  template:'<h1>SpaceX Launch Programs</h1>'
})
export class MissionlistComponent implements OnInit {
  launches: any[] = [];
  filteredLaunches: any[] = [];
  selectedMission: any;
  years: number[] = [];
  constructor(private http: HttpClient,private router: Router, private spx: SpacexapiService)  { }

  missionFilter = new FormGroup({
    year: new FormControl('')
  });



  ngOnInit() {
    // this.http.get<any[]>('https://api.spacexdata.com/v3/launches').subscribe(
    //   (response) => {
    //     this.launches = response;
    //     this.filteredLaunches = response;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

      this.spx.getLaunches().subscribe(
      (response) => {
        this.launches = response;
        this.filteredLaunches = response;
      },
      (error) => {
        console.error(error);
      }
    );

  

    const currentYear = new Date().getFullYear();
  const startYear = 2006;
  for (let i = startYear; i <= currentYear; i++) {
    this.years.push(i);
  }
    }


  showMissionDetails(launch: any) {
    this.router.navigate(['/missions', launch.flight_number]);
  }

  filterMissions() {
    const year = this.missionFilter.get('year')?.value;
  
    if (!year) {
      this.filteredLaunches = this.launches;
      return;
    }
    
    this.filteredLaunches = this.launches.filter(launch => launch.launch_year === year.toString());
    console.log(this.filteredLaunches)
  }
  

}

