import { RefObject } from "react";
import { Option } from "../types";
/**
 * 옵션 리스트의 스크롤 위치를 조정하는 훅
 * @param listRef // 리스트 엘리먼트의 ref
 * @param loadedOptions // 로드데이터 옵션 목록
 * @param selectedValue // 선택된 값
 * @param inputChangeText // 입력된 텍스트
 * @param filteredOptions // 필터링된 옵션 목록
 * @param options // 옵션 목록
 * @param setOverIndex // 마우스 오버 인덱스 설정
 * @param setSelectedIndex // 선택된 인덱스 설정
 * @param setIsFocusIn // 포커스 상태 설정
 * @param setIsOpen // 옵션 박스 열림 상태 설정
 * @param setIsFetch // 데이터 로드 상태 설정
 * @param setLoadedOptions // 로드된 옵션 목록 설정
 * @param setFilteredOptions // 필터링된 옵션 목록 설정
 * @returns
 */
export const useScrollPosition = ({
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
}: {
  listRef: RefObject<HTMLUListElement>;
  loadedOptions: Option[] | null;
  selectedValue: string | null;
  inputChangeText: string;
  filteredOptions: Option[] | null;
  options: Option[] | (() => Promise<Option[]>);
  setOverIndex: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  setIsFocusIn: (isFocusIn: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsFetch: (isFetch: boolean) => void;
  setLoadedOptions: (data: Option[]) => void;
  setFilteredOptions: (data: Option[]) => void;
}) => {
  const adjustScrollPosition = (
    index: number,
    scrollToTop: boolean = false
  ) => {
    if (!listRef.current || !loadedOptions) return;
    const container = listRef.current;
    const selectedItem = container.children[index] as HTMLElement;
    if (selectedItem) {
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      container.scrollTop = scrollToTop
        ? itemTop
        : itemTop < container.scrollTop
        ? itemTop
        : itemBottom > container.scrollTop + container.offsetHeight
        ? itemBottom - container.offsetHeight
        : container.scrollTop;
    }
  };
  // 선택된 값이 있는지 확인하고 스크롤 위치 조정
  const selectedIsValue = () => {
    const index = selectedValue
      ? loadedOptions?.findIndex((option) => option.label === selectedValue)
      : inputChangeText !== ""
      ? loadedOptions?.findIndex((option) => option.label === inputChangeText)
      : -1;
    setOverIndex(index ?? -1);
    setSelectedIndex(index ?? -1);
    if (index !== -1) {
      setTimeout(() => adjustScrollPosition(index ?? -1, true), 0);
    }
    setIsFocusIn(false);
  };
  // 옵션 클릭시 핸들러
  const optionClickOpen = async () => {
    setIsOpen(true);
    if (!filteredOptions?.length && typeof options === "function") {
      try {
        const data = await options();
        setLoadedOptions(data);
        setFilteredOptions(data);
        setIsFetch(true);
      } catch (error) {
        console.error("Error loading options", error);
      }
    } else {
      selectedIsValue();
    }
    setIsFocusIn(true);
  };
  return { adjustScrollPosition, selectedIsValue, optionClickOpen };
};
