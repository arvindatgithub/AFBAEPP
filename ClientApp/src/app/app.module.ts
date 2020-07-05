import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { GroupSearchComponent } from './group-search/group-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { GroupSetupComponent } from './group-setup/group-setup.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AccidentComponent } from './accident/accident.component';
import { FPPGComponent } from './fppg/fppg.component';
import { HospitalIndemnityComponent } from './hospital-indemnity/hospital-indemnity.component';
import { FPPIndividualComponent } from './fpp-individual/fpp-individual.component';
import { EmployerPaidCIComponent } from './employer-paid-ci/employer-paid-ci.component';
import { VoluntaryCIComponent } from './voluntary-ci/voluntary-ci.component';
import { VolGroupLifeComponent } from './vol-group-life/vol-group-life.component';
import { BasicGroupLifeComponent } from './basic-group-life/basic-group-life.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material'
import { AgentSetupComponent } from './agent-setup/agent-setup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CustomBulkUpdateComponent } from './custom-bulk-update/custom-bulk-update.component';
import { CustomBulkTemplateComponent } from './custom-bulk-template/custom-bulk-template.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BasicGroupLifeQuestionsComponent } from './basic-group-life-questions/basic-group-life-questions.component';
import { FppgQuestionsComponent } from './fppg-questions/fppg-questions.component';
import { FppiQuestionsComponent } from './fppi-questions/fppi-questions.component';
import { VolGroupLifeQuestionsComponent } from './vol-group-life-questions/vol-group-life-questions.component';
import { VoluntaryCiQuestionsComponent } from './voluntary-ci-questions/voluntary-ci-questions.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './shared/error-handler/error-interceptor';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    HeaderComponent,
    FooterComponent,
    GroupSearchComponent,
    GroupSetupComponent,
    AccidentComponent,
    FPPGComponent,
    HospitalIndemnityComponent,
    FPPIndividualComponent,
    EmployerPaidCIComponent,
    VoluntaryCIComponent,
    VolGroupLifeComponent,
    BasicGroupLifeComponent,
    AgentSetupComponent,
    RadioButtonComponent,
    CustomBulkUpdateComponent,
    CustomBulkTemplateComponent,
    BasicGroupLifeQuestionsComponent,
    FppgQuestionsComponent,
    FppiQuestionsComponent,
    VolGroupLifeQuestionsComponent,
    VoluntaryCiQuestionsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ToastrModule.forRoot(),
    HttpClientModule, 
    MatExpansionModule,
    MatSnackBarModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    //SharedModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    AutocompleteLibModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    DragDropModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'group-search', component: GroupSearchComponent },
      { path: 'group-setup', component: GroupSetupComponent},
      { path: 'accident', component: AccidentComponent},
      { path: 'basic-group-life', component: BasicGroupLifeComponent},
      { path: 'employer-paid-ci', component: EmployerPaidCIComponent},
      { path: 'fppg', component: FPPGComponent},
      { path: 'fpp-individual', component: FPPIndividualComponent},
      { path: 'hospital-indemnity', component: HospitalIndemnityComponent},
      { path: 'vol-group-life', component: VolGroupLifeComponent},
      { path: 'voluntary-ci', component: VoluntaryCIComponent},
      { path: 'radio-button', component: RadioButtonComponent},
      { path: 'custom-bulk-update', component: CustomBulkUpdateComponent},
      { path: 'custom-bulk-template', component: CustomBulkTemplateComponent},
      { path: 'radio-button', component: RadioButtonComponent}           
    ])
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
