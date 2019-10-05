import { ControlRenderer } from './control-renderer';

export class EmailRenderer extends ControlRenderer {
    constructor(elemRef, valContentRef) {
        super(elemRef, valContentRef);

        this._valRuleNode = this._valContentRef.querySelector('.val-rule');
    }

    _createContent(state) {
        this._updateContent(state);
    }

    _updateContent(state) {
        this._updateValRuleNodeState(this._valRuleNode, state.valid);
    }
}