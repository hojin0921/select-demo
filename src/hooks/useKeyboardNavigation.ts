import { UseKeyboardNavigationProps, OptionActionType } from "../types";

/**
 * 키보드로 옵션을 선택하는 훅
 * @param filteredOptions // 필터링된 옵션 목록
 * @param handleSelectItem // 옵션 선택 핸들러
 * @param setIsOpen // 옵션 박스 열기/닫기 핸들러
 * @param setOverIndex // 마우스 오버 인덱스 설정 핸들러
 * @param overIndex // 마우스 오버된 인덱스
 * @param isOpen // 옵션 박스 열려있는지 여부
 * @param optionClickOpen // 옵션 박스 열기 핸들러
 * @param adjustScrollPosition // 스크롤 위치 조정 핸들러
 * @returns
 */
export const useKeyboardNavigation = ({
  filteredOptions,
  handleSelectItem,
  setIsOpen,
  setOverIndex,
  overIndex,
  isOpen,
  optionClickOpen,
  adjustScrollPosition,
}: UseKeyboardNavigationProps) => {
  // 키보드 이벤트시 스크롤 위치 조정
  const _optionOpen = async (type: OptionActionType) => {
    setOverIndex((prev: number) => {
      const nextIndex =
        type === OptionActionType.ArrowUp
          ? Math.max(prev - 1, 0)
          : Math.min(
              prev + 1,
              filteredOptions ? filteredOptions.length - 1 : 0
            );
      adjustScrollPosition(nextIndex);
      return nextIndex;
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyActions: { [key: string]: () => void } = {
      ArrowDown: () => _optionOpen(OptionActionType.ArrowDown),
      ArrowUp: () => _optionOpen(OptionActionType.ArrowUp),
      Enter: () => {
        if (overIndex >= 0 && filteredOptions)
          handleSelectItem(filteredOptions[overIndex]);
      },
      Escape: () => setIsOpen(false),
    };
    const action = keyActions[event.key];
    if (action) {
      if (isOpen) {
        action();
      } else {
        optionClickOpen();
      }
    }
  };

  return { handleKeyDown };
};
