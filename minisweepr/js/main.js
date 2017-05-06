import { MyRouter } from 'router';
import 'jquery';
import { beginnerGame } from './controllers/easyLevel.js';
import { intermediateGame } from './controllers/mediumLevel.js';
import { expertGame } from './controllers/hardLevel.js';
import { Utilities } from './utilities.js';
import { help } from './controllers/helpController.js';
import {newGame} from './controllers/level.js';

const router = new MyRouter();

// starts facebook sdk and twitter widget
const shareUtilities = new Utilities();
shareUtilities.facebookShare(document, 'script', 'facebook-jssdk');
shareUtilities.twitterShare(document, "script", "twitter-wjs");

router
    .on('/beginner', () => newGame(10, 9, 9))
    .on('/intermediate', () => newGame(40, 16, 16))
    .on('/expert', () => newGame(99, 16, 30))
    .on('/new-game', () => location.hash = '/beginner') //restart return to first page,see video
    .on('/help', () => help());
//logic da se zachistqt bombite


$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());