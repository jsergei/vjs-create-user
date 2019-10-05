import { ControlRenderer } from './control-renderer';

export class ConfirmPasswordRenderer extends ControlRenderer {
    constructor(elemRef, valContentRef) {
        super(elemRef, valContentRef);
        
        this._valRuleNodeList = this._valContentRef.querySelector('.val-rule-list');
        
        this._matchNode = null;
        this._passwordRulesNode = null;
    }

    _createContent(state) {
        this._matchNode = this._createValRuleNode(state.match,
            'Passwords match');
        this._passwordRulesNode = this._createValRuleNode(state.passwordRules,
            'Follow all of the password rules');

        const liFragment = new DocumentFragment();
        liFragment.append(
            this._matchNode,
            this._passwordRulesNode);

        this._valRuleNodeList.innerHTML = '';
        this._valRuleNodeList.append(liFragment);
    }

    _updateContent(state) {
        this._updateValRuleNodeState(this._matchNode, state.match);
        this._updateValRuleNodeState(this._passwordRulesNode, state.passwordRules);
    }
}
