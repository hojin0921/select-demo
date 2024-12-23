import { RefObject } from "react";

export enum OptionActionType {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Focus = "focus",
}
export interface Option {
  value: string;
  label: string;
}
interface WithOptions {
  loadedOptions: Option[] | null;
  filteredOptions: Option[] | null;
}
interface WithIndices {
  selectedIndex: number;
  overIndex: number;
}
interface WithIsOpen {
  isOpen: boolean;
}
export interface SelectProps {
  options: Option[] | (() => Promise<Option[]>);
  value?: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  selectedIsValue?: () => void;
}

export interface UseDropdownPositionProps extends WithIsOpen {
  selectRef: RefObject<HTMLDivElement>;
  listRef: RefObject<HTMLUListElement>;
}

export interface UseSelectWidthProps {
  textMeasureRef: React.RefObject<HTMLSpanElement>;
  loadedOptions: Option[] | null;
}

export interface UseKeyboardNavigationProps extends WithIsOpen {
  filteredOptions: Option[] | null;
  handleSelectItem: (item: Option) => void;
  setIsOpen: (isOpen: boolean) => void;
  overIndex: number;
  optionClickOpen: () => void;
  adjustScrollPosition: (index: number, scrollToTop?: boolean) => void;
  setOverIndex: (index: number | ((prev: number) => number)) => void;
}

export interface SelectState extends WithOptions, WithIndices, WithIsOpen {
  inputChangeText: string;
  selectedValue: string | null;
  isFetch: boolean;
}

interface SetterFunctions {
  setIsOpen: (isOpen: boolean) => void;
  setOverIndex: (index: number | ((prev: number) => number)) => void;
  setSelectedIndex: (index: number) => void;
}

export interface SelectStateSetters extends SetterFunctions {
  setLoadedOptions: (data: Option[] | null) => void;
  setFilteredOptions: (data: Option[] | null) => void;
  setIsFetch: (isFetch: boolean) => void;
}

export interface SelectEventHandlers {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectItem: (item: Option) => void;
  handleClear: () => void;
}

export interface UseSelectReturn
  extends SelectState,
    SelectStateSetters,
    SelectEventHandlers {}
