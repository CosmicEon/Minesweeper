import { MyRouter } from 'router';
import 'jquery';
import { beginnerGame } from './controllers/easyLevel.js';
import { intermediateGame } from './controllers/mediumLevel.js';
import { expertGame } from './controllers/hardLevel.js';
import { Utilities } from './utilities.js';
import { help } from './controllers/helpController.js';

const router = new MyRouter();

// starts facebook sdk and twitter widget
const shareUtilities = new Utilities();
shareUtilities.facebookShare(document, 'script', 'facebook-jssdk');
shareUtilities.twitterShare(document, "script", "twitter-wjs");

router
    .on('/beginner', beginnerGame)
    .on('/intermediate', intermediateGame)
    .on('/expert', expertGame)
    .on('/new-game', () => location.hash = '/beginner') //restart return to first page,see video
    .on('/help', () => help());


$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());