import { getCurrentCountry, isCom } from "./helpers.js";

window.pmgtSelectDecorators = {
    'regions-picker': regions => {
        return regions.map(r => {
            return { id: r.id, name: r.name, sourceValue: r }
        });
    },
    "cities-and-regions": function (regions) {
        const moscowRegionId = 1;
        const spbRegionId = 2;
        function getItem(region) {
            const country = getCurrentCountry();
            if (isCom()) {
                return getItemForCom(region);
            } else if (country === 'TR') {
                return getShortItemHtml(region);
            } else if (country === 'RU') {
                if (region.id === moscowRegionId || region.id === spbRegionId) {
                    return getFullItemHtml(region);
                } else {
                    return getShortItemHtml(region);
                }
            } else {
                return getFullItemHtml(region);
            }
        }

        function getItemForCom(region) {
            return {
                id: region.id,
                name: region.city,
                sourceValue: region
            }
        }

        function getShortItemHtml(region) {
            return {
                id: region.id,
                name: region.name,
                sourceValue: region
            }
        }
        function getFullItemHtml(region) {
            return {
                id: region.id,
                name: region.city + (region.city === region.name ? '' : (' и ' + region.name)),
                sourceValue: region
            }
        }

        return regions.map(r => getItem(r));
    },
}