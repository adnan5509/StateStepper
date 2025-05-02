import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, withLatestFrom } from "rxjs";
import { decrement, increment } from "./counter.actions";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCount } from "./counter.selectors";

@Injectable()
export class CounterEffects {
    constructor(private actions$: Actions, private store: Store<{ counter: number }>) { }

    saveCount = createEffect(
        () =>
            this.actions$.pipe(
                ofType(increment, decrement),
                withLatestFrom(this.store.select(selectCount)),
                tap(([action, counter]) => {
                    localStorage.setItem('Change', counter.toString());
                })
            ), { dispatch: false }
    )
}