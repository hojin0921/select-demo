import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
  .text-measure {
    visibility: hidden;
    position: absolute;
    white-space: nowrap;
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    line-height: 1;
    &.focus {
      transform: translateY(-50%) rotate(180deg);
    }
  }
  input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 32px;
    text-indent: 8px;
    position: relative;
    &:focus-visible {
      border: 1px solid #006bd6;
      background: #ebf5ff;
    }
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
      &:focus-visible {
        border: 1px solid #006bd6;
        background: #ebf5ff;
      }
    }
  }
  .clear-button {
    position: absolute;
    right: 37px;
    top: 50%;
    transform: translateY(-50%) scaleY(0.8);
    background: #f5f5f5;
    font-size: 12px;
    width: 20px;
    height: 25px;
    line-height: 20px;
    border-radius: 6px;
    padding: 0;
  }
`;

export const OptionsList = styled.ul`
  position: absolute;
  bottom: 100%;
  top: auto;
  left: 0;
  right: 0;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  &.top {
    bottom: auto;
    top: 100%;
  }
`;

export const OptionItem = styled.li<{ disabled?: boolean }>`
  padding: 8px 12px;
  font-size: 12px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  &:hover {
    background: ${(props) => (props.disabled ? "none" : "#f5f5f5")};
  }

  &.selected {
    background-color: #ebf5ff;
    color: #006bd6;
  }
  &.hovered {
    background: ${(props) => (props.disabled ? "none" : "#f5f5f5")};
    &.selected {
      background-color: #ebf5ff;
      color: #006bd6;
    }
  }
`;
