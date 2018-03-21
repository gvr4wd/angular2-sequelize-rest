import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  CovalentChipsModule, CovalentCommonModule, CovalentDataTableModule, CovalentDialogsModule,
  CovalentExpansionPanelModule, CovalentFileModule,
  CovalentJsonFormatterModule,
  CovalentLayoutModule, CovalentLoadingModule,
  CovalentMediaModule, CovalentMenuModule,
  CovalentMessageModule, CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule, CovalentStepsModule
} from '@covalent/core';
import {RequestInterceptor} from '../config/interceptors/request.interceptor';
import {CovalentHttpModule} from '@covalent/http';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentMarkdownModule} from '@covalent/markdown';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule { }

/** Material Modules */
export const MATERIAL_MODULES = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatSidenavModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatProgressBarModule,
  MatChipsModule,
  MatGridListModule,
  MatRippleModule,
];

/** Covalent Modules */
export const COVALENT_MODULES = [
  CovalentCommonModule,
  CovalentLayoutModule,
  CovalentMediaModule,
  CovalentExpansionPanelModule,
  CovalentStepsModule,
  CovalentDialogsModule,
  CovalentLoadingModule,
  CovalentSearchModule,
  CovalentPagingModule,
  CovalentFileModule,
  CovalentNotificationsModule,
  CovalentMenuModule,
  CovalentChipsModule,
  CovalentJsonFormatterModule,
  CovalentDataTableModule,
  CovalentHighlightModule,
  CovalentMarkdownModule,
  CovalentDynamicFormsModule,
  CovalentMessageModule,
  CovalentHttpModule.forRoot({
    interceptors: [{
      interceptor: RequestInterceptor, paths: ['**'],
    }],
  }),
];
