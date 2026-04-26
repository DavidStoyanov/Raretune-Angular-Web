import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trackById'
})
export class TrackByIdPipe implements PipeTransform {
    transform(index: number, item: any): unknown {
        return item.id;
    }
}
