import { ILocalStore } from '@utils/useLocalStore';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_inputValue';

export default class SearchStore implements ILocalStore {
  private _inputValue = '';

  constructor() {
    makeObservable<SearchStore, PrivateFields>(this, {
      _inputValue: observable,
      inputValue: computed,
      setInputValue: action.bound,
    });
  }

  get inputValue() {
    return this._inputValue;
  }

  setInputValue(value: string) {
    this._inputValue = value;
  }

  destroy(): void {}
}
