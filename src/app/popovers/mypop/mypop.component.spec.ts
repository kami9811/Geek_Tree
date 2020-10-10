import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypopComponent } from './mypop.component';

describe('MypopComponent', () => {
  let component: MypopComponent;
  let fixture: ComponentFixture<MypopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
