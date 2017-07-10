import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { database } from 'firebase';
import { TableConfig, PathConfig } from '../../models';
import { NgFbSortableTableService } from '../../services/sortable-table.service';
import { SortableEvents, FieldToQueryBy } from '../../models';

import 'rxjs/add/operator/first';
import "rxjs/add/operator/do";

@Component({
    selector: 'ngfb-sortable-table',
    templateUrl: './ngfb-sortable-table.component.html',
    styleUrls: ['./ngfb-sortable-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NgFbSortableTableService ],
})
export class NgFbSortableTableComponent implements OnChanges {
    @Input() private tableConfig: TableConfig;
    @Input() private currentPath: string;
    private currentConfig: PathConfig;
    private isLoading: boolean = false;
    private data: Array<database.DataSnapshot> = [];

    constructor(public service: NgFbSortableTableService) { }

    ngOnChanges(changes: SimpleChanges): void {
        const path = changes['currentPath'] as SimpleChange;
        if (path) {
            if (this.tableConfig.hasOwnProperty(path.currentValue)) {
                this.currentConfig = this.tableConfig[path.currentValue];
            } else {
                throw new ReferenceError(`Config for path ${path.currentValue} is not found`);
            }
        }
    }

    private fetchData(event? : number, fieldToQueryBy?: FieldToQueryBy, cleanUp?: boolean): void {
        this.isLoading = true;
        this.reset(event);
        this.service
          .get(this.currentPath, event, fieldToQueryBy)
          .first()
          .do(() => this.isLoading = false)
          .subscribe(arr => cleanUp ?
            this.data.splice(0, this.data.length, ...arr) :
            this.data.push(...arr)
          );
    }

    private onInfinite(): void {
        if (this.currentConfig.pagination) {
            this.fetchData(
              SortableEvents.InfiniteScroll,
              null,
              this.service.lastEventHappened !== undefined
            );
        }
    }

    private reset(nextEvent): void {
        // switch (nextEvent) {
        //     case SortableEvents.FilterBySearch : {
        //         this.fieldToSortBy = '';
        //         if (this.filterBySelect) {
        //             this.filterBySelect.defaultOption = this.filterBySelect.resetTo;
        //         }
        //         break;
        //     }
        //     case SortableEvents.FilterBySelect: {
        //         this.fieldToSortBy = '';
        //         if (this.filterByInputValue && this.searchString) {
        //             this.searchString['nativeElement'].value = '';
        //         }
        //         break;
        //     }
        //     case SortableEvents.SortByField : {
        //         if (this.filterBySelect) {
        //             this.filterBySelect.defaultOption = this.filterBySelect.resetTo;
        //         }
        //         if (this.filterByInputValue && this.searchString) {
        //             this.searchString['nativeElement'].value = '';
        //         }
        //         break;
        //     }
        // }
    }
}
