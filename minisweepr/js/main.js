import { MyRouter } from 'router';
import 'jquery';
import { beginnerGame } from './controllers/easyLevel.js';
import { intermediateGame } from './controllers/mediumLevel.js';
import { expertGame } from './controllers/hardLevel.js';
import { Utilities } from './utilities.js';

const router = new MyRouter();

// starts facebook sdk and twitter widget
const shareUtilities = new Utilities();
shareUtilities.facebookShare(document, 'script', 'facebook-jssdk');
shareUtilities.twitterShare(document, "script", "twitter-wjs");

router
    .on('/beginner', beginnerGame)
    .on('/intermediate', intermediateGame)
    .on('/expert', expertGame)
    .on('/new-game', () => location.hash = '/beginner');//restartira tekushtata stranica
//kogato se izbere nivo i se smeni na drugo bombite se zapazvat.
//new game-restartira nivoto
//logic da se zachistqt bombite


$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());