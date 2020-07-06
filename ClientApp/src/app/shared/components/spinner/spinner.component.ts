import { Component, Input } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loading-indicator/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  loading: boolean;
  @Input() isRunning: boolean;
  @Input() isSmall: string;
 constructor(private loaderService: LoaderService) {
  this.loaderService.isLoading.subscribe((v) => {
    this.loading = v;
 });
 }
}
