import { useEffect, useMemo, useRef, useState } from "react";
import { SelectProps } from "../types";
import { OptionItem, OptionsList, SelectContainer } from "./select.styles";
import { useDropdownPosition } from "../hooks/useDropdownPosition";
import { useSelectWidth } from "../hooks/useSelectWidth";
import { useSelect } from "../hooks/useSelect";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useScrollPosition } from "../hooks/useScrollPosition";

export default function SelectBox({
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
}: SelectProps) {
  const [isFocusIn, setIsFocusIn] = useState<boolean>(false); // 포커스가 셀렉트 박스에 있는지 여부
  const textMeasureRef = useRef<HTMLSpanElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // useSelect 훅을 사용하여 셀렉트 박스 상태와 이벤트 관리
  const {
    isOpen,
    loadedOptions,
    inputChangeText,
    filteredOptions,
    selectedValue,
    selectedIndex,
    overIndex,
    isFetch,
    setIsOpen,
    handleInputChange,
    handleSelectItem,
    handleClear,
    setOverIndex,
    setSelectedIndex,
    setLoadedOptions,
    setFilteredOptions,
    setIsFetch,
  } = useSelect({
    options,
    value,
    onChange,
  });
  // useDropdownPosition 훅을 사용하여 오셥 박스 위치 계산
  const { dropdownPosition } = useDropdownPosition({
    isOpen,
    selectRef,
    listRef,
  });
  // useSelectWidth 훅을 사용하여 셀렉트 박스 너비 계산
  const { containerWidth } = useSelectWidth({ textMeasureRef, loadedOptions });
  // useScrollPosition 훅을 사용하여 스크롤 위치를 조정
  const { adjustScrollPosition, selectedIsValue, optionClickOpen } =
    useScrollPosition({
      listRef,
      loadedOptions,
      selectedValue,
      inputChangeText,
      filteredOptions,
      options,
      setOverIndex,
      setSelectedIndex,
      setIsFocusIn,
      setIsOpen,
      setIsFetch,
      setLoadedOptions,
      setFilteredOptions,
    });
  // 포커스 아웃 핸들러
  const handleBlur = (e: React.FocusEvent) => {
    if (listRef.current?.contains(e.relatedTarget as Node)) return;
    const isValue =
      loadedOptions?.filter(
        (option) =>
          option.label.toLowerCase() === inputChangeText?.toLowerCase()
      ) || [];
    if (isValue.length === 0) handleClear();
    setIsOpen(false);
    setIsFocusIn(false);
  };
  // 키보드 이벤트 핸들러
  const { handleKeyDown } = useKeyboardNavigation({
    filteredOptions,
    overIndex,
    isOpen,
    handleSelectItem,
    setIsOpen,
    optionClickOpen,
    setOverIndex,
    adjustScrollPosition,
  });
  // 선택된 값이 있는지 확인하고 스크롤 위치 조정
  useEffect(() => {
    if (isFetch && loadedOptions && loadedOptions.length > 0) {
      selectedIsValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetch, loadedOptions]);
  // 필터된 옵션 리스트 생성
  const filteredOptionsList = useMemo(() => {
    if (!Array.isArray(loadedOptions)) return null;
    return filteredOptions && filteredOptions.length > 0 ? (
      filteredOptions.map((item, index) => (
        <OptionItem
          key={item.value}
          onClick={() => {
            handleSelectItem(item);
            setIsFocusIn(false);
          }}
          className={`${index === selectedIndex ? "selected" : ""} ${
            index === overIndex ? "hovered" : ""
          }`}
        >
          {item.label}
        </OptionItem>
      ))
    ) : (
      <OptionItem disabled>검색 결과 없음</OptionItem>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedOptions, filteredOptions, selectedIndex, overIndex]);

  return (
    <SelectContainer
      ref={selectRef}
      style={{ width: containerWidth || "auto" }}
    >
      <input
        id={`select-${Math.random().toString(36).substr(2, 9)}`}
        name={`select-${Math.random().toString(36).substr(2, 9)}`}
        tabIndex={0}
        type="text"
        value={inputChangeText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onClick={optionClickOpen}
        onFocus={() => setIsFocusIn(true)}
      />
      <span className={`arrow ${isFocusIn ? "focus" : ""} `}>▼</span>
      {selectedValue !== null && (
        <button
          onClick={handleClear}
          aria-label="clear" // 또는 "삭제" 또는 "지우기"
          data-testid="clear-button"
          className="clear-button"
        >
          X
        </button>
      )}
      {isOpen && (
        <OptionsList
          ref={listRef}
          className={dropdownPosition === "top" ? "bottom" : "top"}
          tabIndex={-1}
        >
          {Array.isArray(loadedOptions) ? (
            filteredOptionsList
          ) : (
            <OptionItem>옵션 로딩중...</OptionItem>
          )}
        </OptionsList>
      )}
      <span
        ref={textMeasureRef}
        className="text-measure"
        style={{ visibility: "hidden" }}
      />
    </SelectContainer>
  );
}
