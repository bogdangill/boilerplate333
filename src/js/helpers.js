export function getApiUrl() {
    const testUrl = document.querySelector('html').getAttribute('test-api-url');
    return testUrl || location.host;
}

export function isCom() {
    return location.host.split('.').pop() === 'com';
}

export function getCurrentCountry() {
    let lang = getCurrentLang();
    if (!lang) {
        console.error('язык не обнаружен');
    }
    return getCurrentLang().slice(3, 5);
}

export function getCurrentLang() {
    const lang = document.getElementsByTagName('html')[0].getAttribute('lang');
    // return lang ? lang.substr(0, 2) : '';//todo вернуть строчку, когда Салават добавит тег
    if (lang) {
        if (lang.length === 2) {
            return `${lang}-${location.host.slice(-2).toUpperCase()}`;
        } else {
            return lang;
        }
    } else {
        return 'ru-RU';
    }
};

export function getHttpProtocol() {
    const testHttpProtocol = document.querySelector('html').getAttribute('test-http-protocol');
    return testHttpProtocol || location.protocol;
}

export function sendRequest(url, type, body, contentType) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        if (contentType) xhr.setRequestHeader("Content-Type", contentType);
        if (body) xhr.send(JSON.stringify(body))
        else xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            } else {
                console.error('Ошибка запроса', xhr);
                reject(xhr);
            }
        }
    });
}