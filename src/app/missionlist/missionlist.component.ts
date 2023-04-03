import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
  template:'<h1>SpaceX Launch Programs</h1>'
})
export class MissionlistComponent implements OnInit {
  launches: any[] = [];

  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.http.get<any[]>('https://api.spacexdata.com/v3/launches').subscribe(data => {
      this.launches = data;
    });
  }

}
