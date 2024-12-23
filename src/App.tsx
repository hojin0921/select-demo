import { useState } from "react";
import "./App.css";
import SelectBox from "./components/select-box";
import { fetchTop100Films, top100Films } from "./data/mockData";

function App() {
  const [selectedValue1, setSelectedValue1] = useState<string>("");
  const [selectedValue3, setSelectedValue3] = useState<string>("");
  const [selectedValue2, setSelectedValue2] = useState<string>("");
  const [selectedValue4, setSelectedValue4] =
    useState<string>("The Dark Knight");
  const [selectedValue5, setSelectedValue5] = useState<string>("Forrest Gump");

  return (
    <>
      <h1>[MOIN] 기술과제</h1>
      <div className="memo">
        <p>
          TypeScript 와 React 를 이용해 Select 컴포넌트와 Select 에 대한 데모
          페이지
        </p>
        <ul>
          <li>
            Select 의 option 은 배열과 함수, 두 가지 타입이 가능해야 합니다.
          </li>
          <li>
            Select 의 폭은 선택 가능한 option 들 중 가장 폭이 넓은 것에 맞춰져
            있어야 합니다. 즉 어떤 option 이라도 그것이 선택되었을 때, 잘린 채로
            표시되어서는 안 됩니다.
          </li>
          <li>
            option 을 검색할 수 있어야 합니다. option 을 선택하지 않고, focus 가
            Select 를 벗어난 경우에는, 검색어가 삭제되어야 합니다.
          </li>
          <li>
            {" "}
            마우스 뿐 아니라 키보드를 사용해도 option 을 선택할 수 있어야
            합니다.
          </li>
          <li>
            {" "}
            Select 를 클릭하거나 Select 에서 위 방향 또는 아래 방향 키보드를
            누르면 선택 가능한 option 들이 나타나야 합니다.
          </li>
          <li>
            클릭하거나 엔터키를 누르는 것으로 option 을 선택할 수 있어야 합니다.
          </li>
          <li>
            {" "}
            선택 가능한 option 들이 나타날 때, 선택된 option 이 있다면, 선택된
            그 option 이 보여야 하고, 강조되어야 하며, 키보드를 이용해 option 을
            순회할 때 선택된 option 이 시작 지점이 되어야 합니다.
          </li>
          <li>
            선택 가능한 option 들이 나타날 때, option 들이 스크린을 벗어나지
            않아야 합니다. 예를 들어, Select 아래쪽에 선택 가능한 option 들이
            나타나기에 공간이 부족하다면, 선택 가능한 option 들은 위쪽에
            나타나야 합니다.
          </li>
          <li>
            Select 가 hover 되는 경우와 focus 되는 경우, 그리고 두 경우가 아닌
            경우에 대해 Select 의 스타일이 달라야 합니다.
          </li>
        </ul>
      </div>
      <div className="demo_box">
        <p>배열 타입</p>
        <SelectBox
          options={top100Films}
          value={selectedValue1}
          onChange={setSelectedValue1}
        />
      </div>
      <div className="demo_box">
        <p>함수 타입</p>
        <SelectBox
          options={fetchTop100Films}
          value={selectedValue2}
          onChange={setSelectedValue2}
        />
      </div>
      <div className="demo_box">
        <p>배열 타입 값이 있는 경우</p>
        <SelectBox
          options={top100Films}
          value={selectedValue4}
          onChange={setSelectedValue4}
        />
      </div>
      <div className="demo_box">
        <p>함수 타입 값이 있는 경우</p>
        <SelectBox
          options={fetchTop100Films}
          value={selectedValue5}
          onChange={setSelectedValue5}
        />
      </div>
      <div style={{ marginTop: "250px" }}>
        <div className="demo_box">
          <p>스크린을 벗어난 경우</p>
          <SelectBox
            options={top100Films}
            value={selectedValue3}
            onChange={setSelectedValue3}
          />
        </div>
      </div>
      <p className="tip">설치 파일 : react18 , vite, typescript, jest</p>
    </>
  );
}

export default App;
