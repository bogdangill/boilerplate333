import { getApiUrl, getCurrentLang, getCurrentCountry, sendRequest } from "./helpers.js";

/**
 * Получает словарь либо от сервера и хранит его в переменной
 */
(function () {
    // let dictionaryKey = "PMGT_DICTIONARY";
    let dictionary = null;
    let addedDictionary = null;

    let getDictUrl$ = new Promise(resolve => {
        window.settingsValuesStore.getValue$('endpoint')
            .then(endpoint => {
                const lang = getCurrentLang();
                if (lang === 'ru-RU')
                    resolve(`${location.protocol}//${getApiUrl()}/dictionary`);
                else
                    resolve(`${location.protocol}//${endpoint}/i18n/dictionary/${lang}.json`);
            });
    });
    let getAddedDict$ = new Promise((resolve, reject) => {
        const currentCountry = getCurrentCountry();
        if (currentCountry === 'RU' || currentCountry === 'KZ') resolve({});
        else if (!addedDictionary) {

            // if (currentCountry === 'VN') {
            //     addedDictionary = window.addedDictionaryVN;
            //     resolve(addedDictionary);
            //     return;
            // }

            sendRequest(`${location.protocol}//api3.${location.hostname}/dictionary/regions?languageCode=${getCurrentLang()}`,
                'GET', null, "application/json").then(addedDict => {
                    resolve(JSON.parse(addedDict));
                })
                .catch(error => reject(error));
        } else {
            resolve(addedDictionary);
        }
    });

    window.onDictionary = new Promise(function (resolve, reject) {
        if (window.mockDictionary) {
            dictionary = window.mockDictionary;
            resolve(mockDictionary);
        };
        if (dictionary) resolve(dictionary);
        else {
            getDictUrl$.then(url => {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                if (getCurrentLang() === 'ru-RU') xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.status === 200) {
                        if (xhr.readyState === 4) {
                            getAddedDict$.then(addedDict => {
                                dictionary = JSON.parse(xhr.response);
                                assignDict(dictionary, addedDict)
                                resolve(dictionary);
                            });
                        }
                    } else {
                        console.error('Ошибка получения словаря', xhr);
                        reject(xhr);
                    }
                }
            });
        }
    });

    function assignDict(dict, addedDictionary) {
        Object.keys(addedDictionary).forEach(k => {
            if (!dict[k]) {
                dict[k] = addedDictionary[k];
            }
            dict.dropDownRegions = addedDictionary.region;
        });
    }

})();