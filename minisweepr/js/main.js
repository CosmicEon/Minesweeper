import { MyRouter } from 'router';
import 'jquery';
import { beginnerGame } from './controllers/easyLevel.js';
import { intermediateGame } from './controllers/mediumLevel.js';
import { expertGame } from './controllers/hardLevel.js';
import { Utilities } from './utilities.js';

const router = new MyRouter();

Utilities.facebookShare();

router
    .on('/beginner', beginnerGame)
    .on('/intermediate', intermediateGame)
    .on('/expert', expertGame)
    .on('/new-game', () => location.hash = '');//restart return to first page,see video


$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());