import { ControlRenderer } from './control-renderer';

export class UsernameRenderer extends ControlRenderer {
    constructor(elemRef, valContentRef) {
        super(elemRef, valContentRef);
        
        this._valRuleNodeList = this._valContentRef.querySelector('.val-rule-list');
        
        this._firstSymbolNode = null;
        this._following3SymbolsNode = null;
        this._remainingAnyNode = null;
        this._lengthRangeNode = null;
    }

    _createContent(state) {
        this._firstSymbolNode = this._createValRuleNode(state.firstSymbol,
            'Start with a letter or an underscore');
        this._following3SymbolsNode = this._createValRuleNode(state.following3Symbols,
            'Follow with 3 letters');
        this._remainingAnyNode = this._createValRuleNode(state.remainingAnyNode,
            'Then contain any number of letters, digits, underscores, or dots');
        this._lengthRangeNode = this._createValRuleNode(state.lengthRangeNode,
            'Between 4 and 20 symbols long');

        const liFragment = new DocumentFragment();
        liFragment.append(
            this._firstSymbolNode,
            this._following3SymbolsNode,
            this._remainingAnyNode,
            this._lengthRangeNode);

        this._valRuleNodeList.innerHTML = '';
        this._valRuleNodeList.append(liFragment);
    }

    _updateContent(state) {
        this._updateValRuleNodeState(this._firstSymbolNode, state.firstSymbol);
        this._updateValRuleNodeState(this._following3SymbolsNode, state.following3Symbols);
        this._updateValRuleNodeState(this._remainingAnyNode, state.remainingAnyNode);
        this._updateValRuleNodeState(this._lengthRangeNode, state.lengthRangeNode);
    }
}