import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SelectBox from "../components/select-box";
import { top100Films, fetchTop100Films } from "../data/mockData";

describe("SelectBox Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  // 기본 렌더링 테스트
  it("기본 렌더링 테스트", () => {
    render(
      <SelectBox
        options={top100Films}
        value=""
        onChange={mockOnChange}
        placeholder="선택해주세요"
      />
    );
    expect(screen.getByPlaceholderText("선택해주세요")).toBeInTheDocument();
  });

  // 정적 옵션 테스트
  describe("정적 옵션 테스트", () => {
    beforeEach(() => {
      render(
        <SelectBox options={top100Films} value="" onChange={mockOnChange} />
      );
    });

    it("클릭하면 옵션 출려되는가?", () => {
      const input = screen.getByRole("textbox");
      fireEvent.click(input);
      // 첫 번째 옵션이 표시되는지 확인
      expect(screen.getByText(top100Films[0].label)).toBeInTheDocument();
    });

    it("입력한 값에 옵션이 반응 하는가?", async () => {
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "Godfather");
      // 필터링된 옵션만 표시되는지 확인
      const filteredOptions = top100Films.filter((film) =>
        film.label.toLowerCase().includes("godfather".toLowerCase())
      );

      filteredOptions.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });
    it("옵션을 클릭하면 선택되는가?", async () => {
      const input = screen.getByRole("textbox");
      fireEvent.click(input);

      const firstOption = screen.getByText(top100Films[2].label);
      fireEvent.click(firstOption);
      expect(mockOnChange).toHaveBeenCalledWith(top100Films[2].label);
    });
  });

  // 비동기 옵션 테스트
  describe("비동기 옵션 테스트", () => {
    beforeEach(() => {
      render(
        <SelectBox
          options={fetchTop100Films}
          value=""
          onChange={mockOnChange}
        />
      );
    });

    it("로딩 상태, 옵션 출력", async () => {
      const input = screen.getByRole("textbox");
      fireEvent.click(input);

      // 로딩 상태 확인
      expect(screen.getByText("옵션 로딩중...")).toBeInTheDocument();

      // 옵션이 로드되었는지 확인
      await waitFor(() => {
        //존재하지 않는 텍스트 확인
        expect(screen.queryByText("옵션 로딩중...")).not.toBeInTheDocument();
      });
    });
  });

  // 키보드 네비게이션 테스트
  describe("키보드 네비게이션 테스트", () => {
    beforeEach(() => {
      render(
        <SelectBox options={top100Films} value="" onChange={mockOnChange} />
      );
    });

    it("화살표 키로 옵션을 탐색", async () => {
      const input = screen.getByRole("textbox");
      fireEvent.click(input);

      // 아래 화살표 키로 첫 번째 옵션 선택
      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(screen.getByText(top100Films[0].label)).toHaveClass("hovered");

      // 위 화살표 키로 이전 옵션 선택
      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(screen.getByText(top100Films[0].label)).toHaveClass("hovered");

      // Enter로 옵션 선택
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalledWith(top100Films[0].label);
    });

    it("Esc 키를 사용하여 드롭다운을 닫습니다.", () => {
      const input = screen.getByRole("textbox");
      fireEvent.click(input);
      fireEvent.keyDown(input, { key: "Escape" });

      // 드롭다운이 닫혔는지 확인
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  // 초기값 테스트
  it("초기값 테스트", () => {
    const initialValue = "Forrest Gump";
    render(
      <SelectBox
        options={top100Films}
        value={initialValue}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByRole("textbox")).toHaveValue(initialValue);
  });

  // 클리어 버튼 테스트
  it("클리어 버튼 테스트", async () => {
    const { container } = render(
      <SelectBox
        options={top100Films}
        value="Forrest Gump"
        onChange={mockOnChange}
      />
    );

    const button = container.querySelector("button");
    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    const firstOption = screen.getByText(top100Films[2].label);
    fireEvent.click(firstOption);
    if (button) {
      fireEvent.click(button);

      const input = container.querySelector("input");
      expect(input).toHaveValue("");
      expect(mockOnChange).toHaveBeenCalledWith("");
    }
  });
});
