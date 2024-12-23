import { useEffect, useState } from "react";
import { UseSelectWidthProps } from "../types";

/**
 * 셀렉트 박스의 너비를 계산하는 훅
 * @param textMeasureRef  // 텍스트 너비를 측정할 span 엘리먼트의 ref
 * @param loadedOptions  // 로드된 옵션 목록
 * @returns
 */
export const useSelectWidth = ({
  textMeasureRef,
  loadedOptions,
}: UseSelectWidthProps) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  useEffect(() => {
    if (textMeasureRef.current && Array.isArray(loadedOptions)) {
      const widths = loadedOptions.map((option) => {
        textMeasureRef.current!.textContent = option.label;
        return textMeasureRef.current!.offsetWidth;
      });
      const maxWidth = Math.max(...widths);
      setContainerWidth(maxWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedOptions]);
  return { containerWidth };
};
