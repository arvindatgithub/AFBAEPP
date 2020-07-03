// import { GroupSearchComponent } from './group-search/group-search.component';
// import { TestBed, async } from '@angular/core/testing';
// import { APP_BASE_HREF } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
// import { GroupSetupComponent } from './group-setup/group-setup.component';
// import { HomeComponent } from './home/home.component';
// import { AccidentComponent } from './accident/accident.component';
// import { BasicGroupLifeComponent } from './basic-group-life/basic-group-life.component';
// import { EmployerPaidCIComponent } from './employer-paid-ci/employer-paid-ci.component';
// import { FPPGComponent } from './fppg/fppg.component';
// import { FPPIndividualComponent } from './fpp-individual/fpp-individual.component';
// import { HospitalIndemnityComponent } from './hospital-indemnity/hospital-indemnity.component';
// import { VolGroupLifeComponent } from './vol-group-life/vol-group-life.component';
// import { VoluntaryCIComponent } from './voluntary-ci/voluntary-ci.component';
// import { RadioButtonComponent } from './radio-button/radio-button.component';
// import { CustomBulkUpdateComponent } from './custom-bulk-update/custom-bulk-update.component';
// import { CustomBulkTemplateComponent } from './custom-bulk-template/custom-bulk-template.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

// fdescribe('AppComponent', () => {
//   const routes: Routes = [
//     { path: '', component: HomeComponent, pathMatch: 'full' },
//     { path: 'group-search', component: GroupSearchComponent },
//     { path: 'group-setup', component: GroupSetupComponent},
//     { path: 'accident', component: AccidentComponent},
//     { path: 'basic-group-life', component: BasicGroupLifeComponent},
//     { path: 'employer-paid-ci', component: EmployerPaidCIComponent},
//     { path: 'fppg', component: FPPGComponent},
//     { path: 'fpp-individual', component: FPPIndividualComponent},
//     { path: 'hospital-indemnity', component: HospitalIndemnityComponent},
//     { path: 'vol-group-life', component: VolGroupLifeComponent},
//     { path: 'voluntary-ci', component: VoluntaryCIComponent},
   
//     { path: 'custom-bulk-update', component: CustomBulkUpdateComponent},
//     { path: 'custom-bulk-template', component: CustomBulkTemplateComponent},
      
//   ];
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         HomeComponent,
//         GroupSearchComponent,
//         GroupSetupComponent,
//         AccidentComponent,
//         BasicGroupLifeComponent,
//         EmployerPaidCIComponent,
//         FPPGComponent,
//         FPPIndividualComponent,
//         HospitalIndemnityComponent,
//         VolGroupLifeComponent,
//         VoluntaryCIComponent,
//         CustomBulkUpdateComponent,
//         CustomBulkTemplateComponent,
//         HeaderComponent,
//         FooterComponent,
        
//       ],
//       imports: [
//         RouterModule.forRoot(routes)
//       ],
//       providers: [
//         { provide: APP_BASE_HREF, useValue: '/' }
//       ]
//     }).compileComponents();
//   }));

//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));

//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app');
//   }));

//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('app');
//   }));
// });