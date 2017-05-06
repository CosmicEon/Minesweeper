// not shure if this has any use

class jsonRequester {
    send(method, url, options) {
    options = options || {};

    let headers = options.headers || {},
      data = options.data || undefined;

    let promise = new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        headers: headers,
        data: JSON.stringify(data),
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
    return promise;
  }

  get(url, options) {
    return send('GET', url, options);
  }

 post(url, options) {
    return send('POST', url, options);
  }
}  


export { jsonRequester };