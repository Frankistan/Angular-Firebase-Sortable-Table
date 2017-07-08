import { FieldToQueryBy } from './filter-to-query-by.interface';
import {Component} from '@angular/core';

export interface DefaultSort extends FieldToQueryBy {
    event: number
}

interface Pagination {
    defaultOption: number;
    options: Array<number>;
    placeholder?: string;
}

interface TableFilterOption {
    value: any;
    text: string;
}

interface SelectFilter {
    field: string;
    defaultOption: string | number | boolean;
    resetTo: string | number | boolean;
    placeholder?: string;
    options: Array<TableFilterOption>;
}

interface SearchString {
    defaultField: string;
    inputPlaceholder?: string;
    selectPlaceholder?: string;
    fields: Array<TableFilterOption>;
}

export interface PathConfig {
    itemComponent: Component;
    searchByString?: SearchString;
    selectFilter?: SelectFilter;
    pagination?: Pagination;
    defaultSort?: DefaultSort;
    headerComponent?: Component;
    footerComponent?: Component;
    newItemsToBeAddedMnually?: boolean;
}

export interface TableConfig {
    paths: {
        [key: string]: PathConfig
    }
}