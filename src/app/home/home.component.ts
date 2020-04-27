import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Documents } from '@app/documents';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  documents;
  @ViewChild('slideContainer') sliderContainer: ElementRef;
  rows = 10;
  fieldSort;
  constructor(private homeService: HomeService) {
    if (localStorage.getItem('documents')) {
      this.documents = JSON.parse(localStorage.getItem('documents'));
      this.documents.map(
        val => {
          if (val.dob.age < 21) {
            return Object.assign(val, {
              color: 'red',
              city: val.location.city
            });
          } else if (val.dob.age >= 21 && val.dob.age <= 56) {
            return Object.assign(val, {
              color: 'green',
              city: val.location.city
            });
          } else {
            return Object.assign(val, {
              color: 'blue',
              city: val.location.city
            });
          }
        }
      );
      console.log('this.documents', this.documents);
    }
  }

  ngOnInit(): void {
    if (!this.documents) {
      this.homeService.getDocuments(this.rows).subscribe(
        response => {


          this.documents = response.results;
          this.documents.map(
            val => {
              if (val.dob.age < 21) {
                return Object.assign(val, {
                  color: 'red',
                  city: val.location.city
                });
              } else if (val.dob.age >= 21 && val.dob.age <= 56) {
                return Object.assign(val, {
                  color: 'green',
                  city: val.location.city
                });
              } else {
                return Object.assign(val, {
                  color: 'blue',
                  city: val.location.city
                });
              }
            }
          );
          console.log(this.documents);
        }
      );
    }
  }

  ngAfterViewInit() {
    // tslint:disable-next-line: variable-name
    window.addEventListener('scroll', (event) => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (Math.ceil(scrolled) === scrollable) {
        console.log('you\'ve reached the bottom');
        this.rows += 10;
        this.homeService.getDocuments(this.rows).subscribe(
          response => {
            this.documents = response.results;
            this.documents.map(
              val => {
                if (val.dob.age < 21) {
                  return Object.assign(val, {
                    color: 'red',
                    city: val.location.city
                  });
                } else if (val.dob.age >= 21 && val.dob.age <= 56) {
                  return Object.assign(val, {
                    color: 'green',
                    city: val.location.city
                  });
                } else {
                  return Object.assign(val, {
                    color: 'blue',
                    city: val.location.city
                  });
                }
              }
            );
            localStorage.setItem('documents', JSON.stringify(this.documents));
          }
        );
      }
    }, false);
    this.sliderContainer.nativeElement.addEventListener('scroll', (event) => {
      if (parseInt(event.target.offsetWidth, 10) + parseInt(event.target.scrollLeft, 10) === parseInt(event.target.scrollWidth, 10)) {
        this.rows += 10;
        this.homeService.getDocuments(this.rows).subscribe(
          response => {
            this.documents = response.results;
            this.documents.map(
              val => {
                if (val.dob.age < 21) {
                  return Object.assign(val, {
                    color: 'red',
                    city: val.location.city
                  });
                } else if (val.dob.age >= 21 && val.dob.age <= 56) {
                  return Object.assign(val, {
                    color: 'green',
                    city: val.location.city
                  });
                } else {
                  return Object.assign(val, {
                    color: 'blue',
                    city: val.location.city
                  });
                }
              }
            );
            localStorage.setItem('documents', JSON.stringify(this.documents));
            console.log('you\'ve reached the bottom 2');
          }
        );
      }
    }, false);

  }
}
