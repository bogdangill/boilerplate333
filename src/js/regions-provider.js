import { getCurrentCountry } from "./helpers.js";

class RegionsProvider {

    static eventName = 'regions-provider';

    _getDataEventCB;

    constructor() {
        this._getDataEventCB = event => {
            onDictionary.then(dictionary => {
                const data = this._getData(dictionary);
                event.detail.element.dispatchEvent(
                    new CustomEvent(RegionsProvider.eventName, {
                        detail: {
                            data: data
                        }
                    })
                );
            });
        };
        //слушаем event чтобы ответить на него своими данными.
        document.addEventListener(`get-data-${RegionsProvider.eventName}`, this._getDataEventCB)
    }

    _sortRegions(regions) {
        const moscowRegionId = 1;
        const spbRegionId = 2;
        if (getCurrentCountry() === 'RU') {
            return [
                regions.find(r => r.id === moscowRegionId),
                regions.find(r => r.id === spbRegionId),
                ...regions.filter(r => r.id !== moscowRegionId && r.id !== spbRegionId)
                    .sort((r1, r2) => {
                        return r1.name.toLowerCase() > r2.name.toLowerCase() ? 1 :
                            r1.name.toLowerCase() < r2.name.toLowerCase() ? -1 : 0;
                    })
            ].filter(r => !!r);
        }
        return regions;
    }

    _getData(dictionary) {
        var regions = dictionary.dropDownRegions || dictionary.Region;
        var regionsCity = dictionary.regionCity || dictionary.RegionCity;
        var regionsDomain = dictionary.regionDomain || dictionary.RegionDomain;
        regions = this._sortRegions(regions);
        regions.forEach(function (r) {
            var city = regionsCity.filter(function (rs) { return rs.regionId === r.id })[0];
            var domain = regionsDomain.filter(function (rd) { return rd.regionId === r.id })[0];
            r.city = city ? city.name : "";
            r.domain = domain ? domain.domain : "";
        });
        return regions;
    }
}

new RegionsProvider();