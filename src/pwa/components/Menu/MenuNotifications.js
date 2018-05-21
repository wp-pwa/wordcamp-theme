import React from 'react';
import styled from 'react-emotion';
import Switch from 'rc-switch';

const MenuNotifications = () => (
  <Container>
    <Text>Push Notifications</Text>
    <SwitchWrapper>
      <Switch />
    </SwitchWrapper>
  </Container>
);

export default MenuNotifications;

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.sizes.button};
  width: 100%;
  display: flex;
  box-shadow: inset 0 -1px 0 0 rgba(40, 36, 9, 0.1);
  font-size: 20px;
  padding: ${({ theme }) => theme.padding.menuItem};
`;

const Text = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`;

const SwitchWrapper = styled.div`
  width: ${({ theme }) => theme.sizes.button};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  .rc-switch {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 32px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    border-radius: 20px 20px;
    background-color: #e9e9e6;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);

    & > span {
      font-size: 12px;
      position: absolute;
      left: 24px;
    }

    &:after {
      position: absolute;
      width: 12px;
      height: 12px;
      left: 4px;
      top: 4px;
      border-radius: 50% 50%;
      content: ' ';
      cursor: pointer;
      transition: left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
      background: ${({ theme }) => theme.color.grey};
    }
    &:focus {
      outline: none;
    }
    &.rc-switch-checked span {
      left: 6px;
    }
    &.rc-switch-checked:after {
      left: 16px;
      background: ${({ theme }) => theme.color.red};
    }
    &.rc-switch-disabled {
      cursor: no-drop;
      background: #ccc;
      border-color: #ccc;
    }
    &.rc-switch-disabled:after {
      background: #9e9e9e;
      cursor: no-drop;
    }
    &.rc-switch-label {
      display: inline-block;
      line-height: 20px;
      font-size: 14px;
      padding-left: 10px;
      vertical-align: middle;
      white-space: normal;
      pointer-events: none;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  }
`;
