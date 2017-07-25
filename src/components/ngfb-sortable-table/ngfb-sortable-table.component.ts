import { Component, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { database } from 'firebase';
import { TableConfig, PathConfig } from '../../models';
import { NgFbSortableTableService } from '../../services/sortable-table.service';
import { Events, FieldToQueryBy } from '../../models';

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
  @Input() public tableConfig: TableConfig;
  @Input() public currentPath: string;
  public currentConfig: PathConfig;
  public data: Array<database.DataSnapshot> = [];
  public isLoading = false;

  constructor(public service: NgFbSortableTableService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const path = changes['currentPath'] as SimpleChange;
    if (path) {
      if (this.tableConfig.hasOwnProperty(path.currentValue)) {
        this.currentConfig = this.tableConfig[path.currentValue] as PathConfig;
        this.currentPath = path.currentValue;
        this.fetchData(null, null, true);
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
      .subscribe(arr => {
        cleanUp ?
          this.data.splice(0, this.data.length, ...arr) :
          this.data.push(...arr);
      });
  }

  public onInfinite(): void {
    console.log('onInfinite');
    if (this.currentConfig.pagination) {
      this.fetchData(
        Events.InfiniteScroll,
        null,
        this.service.lastEventHappened !== undefined
      );
    }
  }

  private reset(nextEvent): void {
    switch (nextEvent) {
      // case Events.FilterBySearch : {
      //   this.currentConfig.fieldToSortBy = '';
      //   if (this.filterBySelect) {
      //     this.filterBySelect.defaultOption = this.filterBySelect.resetTo;
      //   }
      //   break;
      // }
      // case Events.FilterBySelect: {
      //   this.fieldToSortBy = '';
      //   if (this.filterByInputValue && this.searchString) {
      //     this.searchString['nativeElement'].value = '';
      //   }
      //   break;
      // }
      // case Events.SortByField : {
      //   if (this.filterBySelect) {
      //     this.filterBySelect.defaultOption = this.filterBySelect.resetTo;
      //   }
      //   if (this.filterByInputValue && this.searchString) {
      //     this.searchString['nativeElement'].value = '';
      //   }
      //   break;
      // }
    }
  }

  public onEvent(eventType: number, ...args: Array<any>): void {
    console.log('onEvent!');
    switch (eventType) {
      case Events.AddItem:
        break;
      case Events.DeleteItem:
        break;
      case Events.InsertItem:
        break;
      case Events.FilterBySearch:
        break;
      case Events.InfiniteScroll:
        throw new ReferenceError('\'InfiniteScroll\' event is for internal usage only!');
      case Events.FilterBySelect:
        break;
      case Events.SortByField:
        break;
      default:
        throw new ReferenceError(`${eventType} Unknown event type!`);
    }
  }
}
