"use strict";
const AManager_1 = require("./AManager");
const rxjs_1 = require("rxjs");
const async_1 = require("async");
class AsyncQueueManager extends AManager_1.AManager {
    initialize() {
        return rxjs_1.Observable.create((observer) => {
            if (this.components.length === 0) {
                return observer.complete();
            }
            const q = async_1.queue((component, done) => {
                const component$ = component.initialize();
                component$.subscribe({
                    next: observer.next,
                    error: done,
                    complete: done
                });
            }, 1);
            q.drain = observer.complete.bind(observer);
            for (const component of this.components) {
                q.push(component, (error) => {
                    if (error) {
                        observer.error(error);
                    }
                });
            }
        });
    }
}
exports.AsyncQueueManager = AsyncQueueManager;
