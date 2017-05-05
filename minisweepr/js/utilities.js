class Utilities {

    static facebookShare(d, s, id) {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v2.9";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    //     (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s); js.id = id;
    //     js.src = "//connect.facebook.net/bg_BG/sdk.js#xfbml=1&version=v2.9";
    //     fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));

}

export { Utilities };