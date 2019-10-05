import { Utils } from './utils';

export class ControlRenderer {
    constructor(elemRef, valContentRef) {
        this._elemRef = elemRef;
        this._valContentRef = valContentRef;
        this._headerNode = this._valContentRef.querySelector('.validation-content__header');
        
        this._validClassName = 'valid';
        this._invalidClassName = 'invalid';

        this._created = false;
    }

    render(validationState) {
        if (validationState.active) {
            this._valContentRef.classList.remove(this._hiddenClass);
            if (this._created) {
                this._updateContent(validationState);
            } else {
                this._createContent(validationState);
                this._created = true;
            }
            this._updateValHeaderNodeState(state.valid);
        } else {
            this._valContentRef.classList.add(this._hiddenClass);
        }
    }

    _createContent(state) {
        // Abstract
    }

    _updateContent(state) {
        // Abstract
    }

    _createValRuleNode(isValid, text) {
        const valMarkClass = isValid ? this._validClassName : this._invalidClassName;
        const html = `
            <li class="val-rule">
                <div class="val-rule__mark ${valMarkClass}"></div>
                <div class="val-rule__text">${text}</div>
            </li>`;
        return Utils.rawHtmlToFragment(html).firstChild;
    }

    _updateValRuleNodeState(ruleNode, isValid) {
        const markNode = ruleNode.firstElementChild;
        this._updateNodeValClass(markNode, isValid, this._validClassName, this._invalidClassName);
    }

    _updateValHeaderNodeState(isValid) {
        this._updateNodeValClass(this._headerNode, isValid, this._validClassName, this._invalidClassName);
    }

    _updateNodeValClass(nodeRef, isValid, validClassName, invalidClassName) {
        if (isValid) {
            nodeRef.classList.add(validClassName);
            nodeRef.classList.remove(invalidClassName);
        } else {
            nodeRef.classList.add(invalidClassName);
            nodeRef.classList.remove(validClassName);
        }
    }
}