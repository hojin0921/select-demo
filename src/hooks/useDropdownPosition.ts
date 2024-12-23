import { useState, useEffect } from "react";
import { UseDropdownPositionProps } from "../types";

/**
 * 옵션 박스의 위치를 계산하는 훅
 * @param isOpen // 옵션 박스가 열려있는지 여부
 * @param selectRef // 셀렉트 박스의 ref
 * @param listRef // 옵션 박스의 ref
 * @returns
 */
export const useDropdownPosition = ({
  isOpen,
  selectRef,
  listRef,
}: UseDropdownPositionProps) => {
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const _calculateDropdownPosition = () => {
    if (!selectRef.current || !listRef.current) return;
    const selectRect = selectRef.current.getBoundingClientRect();
    const listHeight = listRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;
    if (spaceBelow < listHeight && spaceAbove > spaceBelow) {
      setDropdownPosition("top");
    } else {
      setDropdownPosition("bottom");
    }
  };
  useEffect(() => {
    if (isOpen) {
      _calculateDropdownPosition();
      window.addEventListener("scroll", _calculateDropdownPosition);
      window.addEventListener("resize", _calculateDropdownPosition);
      return () => {
        window.removeEventListener("scroll", _calculateDropdownPosition);
        window.removeEventListener("resize", _calculateDropdownPosition);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return { dropdownPosition };
};
