import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipPageComponent } from './starship-page.component';

describe('StarshipPageComponent', () => {
  let component: StarshipPageComponent;
  let fixture: ComponentFixture<StarshipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarshipPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
