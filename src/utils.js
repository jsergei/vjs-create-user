export class Utils {
    static hasDirectChildChanges(obj1, obj2) {
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);
        if (obj1Keys.length !== obj2Keys.length) {
            return true;
        }
        for (let key of obj1Keys) {
            if (!obj2Keys.find(k2 => key === k2)) {
                return true;
            }
            if (obj1[key] !== obj2[key]) {
                return true;
            }
        }
        return false;
    }

    static rawHtmlToFragment(html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content;
    }
}