class Utilities {

    facebookShare(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v2.9";
        fjs.parentNode.insertBefore(js, fjs);
    }

    twitterShare(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };

        return t;
    }

    setLocalStorage(key, value) {
        let player = {
            name: key,
            score: value
        };

        localStorage.setItem(key, JSON.stringify(player));
    }

    getAllLocalStorage() {
        let archive = [];

        for (let name in localStorage) {
            if (localStorage.hasOwnProperty(name)) {
                archive.push(localStorage[name]);
            }
        }

        return archive;
    }
}

export { Utilities };
