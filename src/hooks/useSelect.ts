import { useState, useEffect } from "react";
import { SelectProps, Option, UseSelectReturn } from "../types";

/**
 * 셀렉트 박스 컴포넌트의 상태와 이벤트를 관리하는 훅
 * @param param0 // 셀렉트 박스 컴포넌트의 props { options, value, onChange }
 * @returns
 */
export const useSelect = ({
  options,
  value,
  onChange,
}: SelectProps): UseSelectReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // 옵션 박스가 열려있는지 여부
  const [loadedOptions, setLoadedOptions] = useState<Option[] | null>(null); // 로드된 옵션 목록
  const [inputChangeText, setInputChangeText] = useState<string>(""); // 입력된 텍스트
  const [filteredOptions, setFilteredOptions] = useState<Option[] | null>(null); // 필터링된 옵션 목록
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // 선택된 값
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // 선택된 인덱스
  const [overIndex, setOverIndex] = useState<number>(-1); // 마우스 오버된 인덱스
  const [isFetch, setIsFetch] = useState<boolean>(false); // 옵션 목록을 가져왔는지 여부

  // 옵션 필터링 함수
  const _optionIncludes = (text: string) =>
    loadedOptions?.filter((option) =>
      option.label.toLowerCase().includes(text.toLowerCase())
    ) || [];

  // 선택된 옵션 인덱스 설정 함수
  const _setOptionIndex = (label: string | null) => {
    const index =
      loadedOptions?.findIndex((option) => option.label === label) ?? -1;
    setOverIndex(index);
    setSelectedIndex(index);
  };

  // 입력 변경 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputChangeText(event.target.value);
    setFilteredOptions(_optionIncludes(event.target.value));
  };

  // 옵션 선택 핸들러
  const handleSelectItem = (item: Option) => {
    setSelectedValue(item.label);
    _setOptionIndex(item.label);
    setIsOpen(false);
  };

  // 선택 초기화 핸들러
  const handleClear = () => {
    setInputChangeText("");
    setSelectedValue(null);
    _setOptionIndex(value || null);
    setFilteredOptions(loadedOptions || []);
  };
  // 선택된 값 변경 시 콜백 실행
  useEffect(() => {
    if (selectedValue) {
      onChange(selectedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);
  // 옵션 목록 변경 시 필터링된 옵션 업데이트
  useEffect(() => {
    setFilteredOptions(loadedOptions);
  }, [loadedOptions]);
  // 초기값 설정
  useEffect(() => {
    setInputChangeText(value || "");
    if (typeof options !== "function") setLoadedOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
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
  };
};
