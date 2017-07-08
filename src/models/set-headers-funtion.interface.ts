import { Observable } from 'rxjs/Observable';
import { HeaderItem } from './header-item.interface';

export type SetHeadersFunction = (data: Observable<{key: string, value: Array<any>}>) => Observable<Array<HeaderItem>>;
