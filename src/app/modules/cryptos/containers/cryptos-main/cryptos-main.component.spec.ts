import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptosMainComponent } from './cryptos-main.component';

describe('CryptosComponent', () => {
  let component: CryptosMainComponent;
  let fixture: ComponentFixture<CryptosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptosMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
