import { NgModule } from '@angular/core';

import { NgFbSortableTableService } from './services/sortable-table.service';
import { SortableItemDirective } from './directives/sortable-item.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { NgFbSortableTableComponent } from './components/ngfb-sortable-table/ngfb-sortable-table.component';

@NgModule({
    declarations: [
        NgFbSortableTableComponent,
        SortableItemDirective,
        InfiniteScrollDirective
    ],
    providers: [ NgFbSortableTableService ],
    exports: [ NgFbSortableTableComponent ]
})
export class NgFbSortableTableModule { }
