import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // this.breadcrumbs = 
      this.buildBreadcrumbs();
      console.log(this.breadcrumbs)
    });

    // Initial load
    // this.breadcrumbs = 
    this.buildBreadcrumbs();
  }

  private buildBreadcrumbs(): Array<{ label: string, url: string }> {
    
    let currentRoute: ActivatedRoute | null = this.activatedRoute.root;
    console.log(currentRoute)

    let url = '';

    console.log(url)

    // Always add Home
    // breadcrumbs.push({ label: 'Главная', url: '/' });

    while (currentRoute) {
      const children = currentRoute.children;
      currentRoute = null;

      children.forEach(route => {
        const routeSnapshot = route.snapshot;
        const routePath = routeSnapshot.routeConfig?.path;

        // Skip empty path routes (lazy loading)
        if (!routePath || routePath === '') {
          currentRoute = route;
          return;
        }

        // Add segment to URL
        const pathSegments = routeSnapshot.url.map(segment => segment.path);

        console.log(pathSegments)

        if (pathSegments.length > 0) {
          url += '/' + pathSegments.join('/');
        }

        console.log(url)

        console.log(routeSnapshot)

        // Get label for breadcrumb
        const label = this.getBreadcrumbLabel(routeSnapshot);

        console.log(label)

        if (label) {
          this.breadcrumbs.push({ label, url });
          console.log(this.breadcrumbs)
        }

        currentRoute = route;
      });
    }

    return this.breadcrumbs;
  }

  private getBreadcrumbLabel(routeSnapshot: any): string {
    const params = routeSnapshot.params;
    const path = routeSnapshot.routeConfig?.path;

    if (!path) return '';

    // Handle warehouse routes
    if (path === 'warehouse') {
      return 'Склады';
    }
    if (path === 'warehouse/:warehouseId/lines') {
      return `Линии склада № ${params.warehouseId}`;
    }
    if (path === 'lines/:lineId/shelfs') {
      return `Стеллажи линии № ${params.lineId}`;
    }
    if (path === 'shelfs/:shelfId/cells') {
      return `Ячейки стеллажа № ${params.shelfId}`;
    }

    return '';
  }

  isLast(crumb: any): boolean {
    return this.breadcrumbs.indexOf(crumb) === this.breadcrumbs.length - 1;
  }

}
