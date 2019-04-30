/// <reference path="../typings/index.d.ts" />
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Dragoon';
        config.map([
            { route: ['', "dragoon"],       moduleId: 'Simulator',        name: 'Dragoon' },
            { route: ['tests'],             moduleId: 'Tests',            name: 'Tests' }
        ]);

        this.router = router;
    }
}