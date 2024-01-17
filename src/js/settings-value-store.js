import { getHttpProtocol, getApiUrl } from "./helpers.js";

export function SettingsValuesStore() {
    let values = null;

    var self = this;

    const getValuePromise$ = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${getHttpProtocol()}//api3.${getApiUrl()}/settings/values`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                if (xhr.readyState === 4) {
                    values = JSON.parse(xhr.response);
                    resolve(values);
                }

            } else {
                console.error('Ошибка получения настроек', xhr);
                reject(xhr);
            }
        }
    });

    this.getValue = function (settingName, groupName) {
        return values.find(v => {
            if (groupName) {
                return v.setting === settingName && v.group === groupName;
            }
            else {
                return v.setting === settingName;
            }
        }).value;
    }

    this.getValue$ = function (settingName, groupName) {
        return new Promise(resolve => {
            getValuePromise$.then(() => {
                resolve(self.getValue(settingName, groupName));
            });
        });

    }
}

window.settingsValuesStore = new SettingsValuesStore();