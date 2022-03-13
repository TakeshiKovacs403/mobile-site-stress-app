import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StrikePage } from './strike.page';

describe('StrikePage', () => {
  let component: StrikePage;
  let fixture: ComponentFixture<StrikePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StrikePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(StrikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
