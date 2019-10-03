export class UsernameValidator {
    constructor(elemRef, valContentRef) {
        this._elemRef = elemRef;
        this._valContentRef = valContentRef;
        
        this.minLength = 4;
        this.maxLength = 20;
        this.validRuleClass = 'val-rule__valid-mark';
        this.invalidRuleClass = 'val-rule__invalid-mark';
        this.validHeaderClass = 'validation-content__header-valid';
        this.invalidHeaderClass = 'validation-content__header-invalid';

        this._rules = [];
        this._valRuleNodeList = null;
    }

    init() {
        this._createRules();

        this._valRuleNodeList = this._valContentRef.querySelector('#val-rule-list');
        this._createRuleNodes();
        this._updateValidState(this._elemRef.value);

        this._elemRef.addEventListener('input', e => {
            const value = e.target.value;
            this._updateValidState(value);
        });
    }

    _createRules() {
        this._rules = [
            {
                test: str => /^[a-zA-Z_].*$/.test(str),
                message: 'Start with a letter or an underscore'
            },
            {
                test: str => /^.(?=[a-zA-Z]{3,}).*$/.test(str),
                message: 'Follow with 3 letters'
            },
            {
                test: str => /^.{4,4}[a-zA-Z0-9-_\.]*$/.test(str),
                message: 'Then contain any number of letters, digits, underscores, or dots'
            },
            {
                test: str => str.length >= this.minLength && str.length <= this.maxLength,
                message: 'Between 4 and 20 symbols long'
            }
        ];
    }

    _createRuleNodes() {
        // create child rules
        const liFragment = new DocumentFragment();
        const value = this._elemRef.value;
        for (let i = 0; i < this._rules.length; i++) {
            const valResult = this._rules[i].test(value);
            const ruleFragment = this._createValRuleFragment(valResult, this._rules[i].message);
            liFragment.append(ruleFragment);
        }

        this._valRuleNodeList.innerHTML = '';
        this._valRuleNodeList.append(liFragment);
    }

    _createValRuleFragment(isValid, text) {
        const valMarkClass = isValid ? this.validRuleClass : this.invalidRuleClass;
        const ruleHtml = `
            <li class="val-rule">
                <div class="val-rule__mark ${valMarkClass}"></div>
                <div class="val-rule__text">${text}</div>
            </li>`;

        const template = document.createElement('template');
        template.innerHTML = ruleHtml;
        return template.content;
    }

    _updateValidState(inputValue) {
        const validResults = [];
        for (let i = 0; i < this._rules.length; i++) {
            const valResult = this._rules[i].test(inputValue);
            validResults.push(valResult);

            const valNode = this._valRuleNodeList.children[i];
            this._updateValRuleNodeState(valNode, valResult);
        }
        const isControlValid = validResults.every(r => r);
        this._updateValHeaderNodeState(isControlValid);
    }

    _updateValRuleNodeState(ruleNode, isValid) {
        const markNode = ruleNode.firstElementChild;
        this._updateNodeValidClass(markNode, isValid, this.validRuleClass, this.invalidRuleClass);
    }

    _updateValHeaderNodeState(isValid) {
        const header = this._valContentRef.querySelector('.validation-content__header');
        this._updateNodeValidClass(header, isValid, this.validHeaderClass, this.invalidHeaderClass);
    }

    _updateNodeValidClass(nodeRef, isValid, validClassName, invalidClassName) {
        if (isValid) {
            if (!nodeRef.classList.contains(validClassName)) {
                nodeRef.classList.add(validClassName);
            }
            if (nodeRef.classList.contains(invalidClassName)) {
                nodeRef.classList.remove(invalidClassName);
            }
        } else {
            if (!nodeRef.classList.contains(invalidClassName)) {
                nodeRef.classList.add(invalidClassName);
            }
            if (nodeRef.classList.contains(validClassName)) {
                nodeRef.classList.remove(validClassName);
            }
        }
    }
}