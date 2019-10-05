import { ControlRenderer } from './control-renderer';

export class PasswordRenderer extends ControlRenderer {
    constructor(elemRef, valContentRef) {
        super(elemRef, valContentRef);
        
        this._valRuleNodeList = this._valContentRef.querySelector('.val-rule-list');
        
        this._firstLetterNode = null;
        this._contains2DigitsNode = null;
        this._containsUppercaseLetterNode = null;
        this._lettersAndDigitsOnlyNode = null;
        this._lengthRangeNode = null;
    }

    _createContent(state) {
        this._firstLetterNode = this._createValRuleNode(state.firstLetter,
            'Start with a letter');
        this._contains2DigitsNode = this._createValRuleNode(state.contains2Digits,
            'Contain at least 2 digits');
        this._containsUppercaseLetterNode = this._createValRuleNode(state.containsUppercaseLetter,
            'Contain at least 1 uppercase letter besides the first letter');
        this._lettersAndDigitsOnlyNode = this._createValRuleNode(state.lettersAndDigitsOnly,
            'Only letters and digits');
        this._lengthRangeNode = this._createValRuleNode(state.lengthRange,
            'At least 8 characters long');

        const liFragment = new DocumentFragment();
        liFragment.append(
            this._firstLetterNode,
            this._contains2DigitsNode,
            this._containsUppercaseLetterNode,
            this._lettersAndDigitsOnlyNode,
            this._lengthRangeNode);

        this._valRuleNodeList.innerHTML = '';
        this._valRuleNodeList.append(liFragment);
    }

    _updateContent(state) {
        this._updateValRuleNodeState(this._firstLetterNode, state.firstLetter);
        this._updateValRuleNodeState(this._contains2DigitsNode, state.contains2Digits);
        this._updateValRuleNodeState(this._containsUppercaseLetterNode, state.containsUppercaseLetter);
        this._updateValRuleNodeState(this._lettersAndDigitsOnlyNode, state.lettersAndDigitsOnly);
        this._updateValRuleNodeState(this._lengthRangeNode, state.lengthRange);
    }
}
