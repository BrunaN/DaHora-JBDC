import { Component, OnInit, Input } from '@angular/core';
import { Attested } from '../models/attested.model';
import { AttestedService } from '../services/attested.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() attested: Attested;

  constructor(private attestedService: AttestedService) { }

  ngOnInit() {
  }

  delete(event){
    event.preventDefault();
    this.attestedService.delete(this.attested)
      .subscribe(data => {
        
      },
        error => {
          console.log(error);
        }
      );
  }

}
