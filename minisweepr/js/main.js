import { MyRouter } from 'router';
import 'jquery';
import { beginnerGame } from './controllers/easyLevel.js';
import { intermediateGame } from './controllers/mediumLevel.js';
import { expertGame } from './controllers/hardLevel.js';


const router = new MyRouter();

router
    .on('/beginner', beginnerGame)
    .on('/intermediate', intermediateGame)
    .on('/expert', expertGame)
    .on('/new-game', () => location.hash = '/beginner');//restart return to first page,see video


$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());