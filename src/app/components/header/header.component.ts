import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CategoryToStringPipe } from 'src/app/pipes/category-to-string.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    CategoryToStringPipe,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CategoryToStringPipe],
})
export class HeaderComponent {
  categories: string[];
  constructor(
    private categoryToStringPipe: CategoryToStringPipe,
    private router: Router
  ) {
    this.categories = Array.from({ length: 6 }, (_, index) =>
      this.categoryToStringPipe.transform(index)
    );
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/list'], { queryParams: { category: category } });
  }
}
