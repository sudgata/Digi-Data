import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavFolderComponent } from './fav-folder.component';

describe('FavFolderComponent', () => {
  let component: FavFolderComponent;
  let fixture: ComponentFixture<FavFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
