import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Layout
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

// Shared
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ExerciseCardComponent } from './shared/components/exercise-card/exercise-card.component';
import { BodyPartCardComponent } from './shared/components/body-part-card/body-part-card.component';

// Home feature
import { HomeComponent } from './features/home/home.component';
import { HeroBannerComponent } from './features/home/components/hero-banner/hero-banner.component';
import { SearchExercisesComponent } from './features/home/components/search-exercises/search-exercises.component';
import { ExercisesListComponent } from './features/home/components/exercises-list/exercises-list.component';

// Exercise detail feature
import { ExerciseDetailComponent } from './features/exercise-detail/exercise-detail.component';
import { DetailInfoComponent } from './features/exercise-detail/components/detail-info/detail-info.component';
import { ExerciseVideosComponent } from './features/exercise-detail/components/exercise-videos/exercise-videos.component';
import { SimilarExercisesComponent } from './features/exercise-detail/components/similar-exercises/similar-exercises.component';
import { SecureImageDirective } from './shared/directives/secure-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    ExerciseCardComponent,
    BodyPartCardComponent,
    HomeComponent,
    HeroBannerComponent,
    SearchExercisesComponent,
    ExercisesListComponent,
    ExerciseDetailComponent,
    DetailInfoComponent,
    ExerciseVideosComponent,
    SimilarExercisesComponent,
    SecureImageDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
