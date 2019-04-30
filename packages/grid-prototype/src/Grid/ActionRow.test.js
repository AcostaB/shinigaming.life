import React from "react";
import { shallow } from "enzyme";
import { Checkbox } from "ui-toolkit";

import ActionRow from "./ActionRow";

const props = {
  children: [],
  onSelectAllClick: () => {},
  selectedItemCount: 0,
  totalItems: 0
};

test("should render without crashing", () => {
  const wrapper = shallow(<ActionRow {...props} />);
  expect(wrapper).toMatchSnapshot();
});

test("select all checkbox should be checked if selected items > 0 and = total items", () => {
  const newProps = {
    ...props,
    selectedItemCount: 100,
    totalItems: 100
  };

  const wrapper = shallow(<ActionRow {...newProps} />);
  const checkBox = wrapper.find(Checkbox);

  expect(checkBox.props().checked).toBe("checked");
});

test("select all checkbox should not be checked if selected items != total items", () => {
  const newProps = {
    ...props,
    selectedItemCount: 10,
    totalItems: 100
  };

  const wrapper = shallow(<ActionRow {...newProps} />);
  const checkBox = wrapper.find(Checkbox);

  expect(checkBox.props().checked).toBe("");
});

test("should render correct count message with one item", () => {
  const newProps = {
    ...props,
    selectedItemCount: 1,
    totalItems: 100
  };

  const wrapper = shallow(<ActionRow {...newProps} />);
  const messageContainer = wrapper.find(".rmmGrid-actionRow-selectedItemCount");

  expect(messageContainer.text()).toBe("1 Item Selected");
});

test("should render correct count message with multiple items", () => {
  const newProps = {
    ...props,
    selectedItemCount: 10,
    totalItems: 100
  };

  const wrapper = shallow(<ActionRow {...newProps} />);
  const messageContainer = wrapper.find(".rmmGrid-actionRow-selectedItemCount");

  expect(messageContainer.text()).toBe("10 Items Selected");
});

test("should trigger onSelectAllClick callback when checkbox clicked", () => {
  const newProps = {
    ...props,
    onSelectAllClick: jest.fn(),
    selectedItemCount: 10,
    totalItems: 100
  };

  const wrapper = shallow(<ActionRow {...newProps} />);
  const checkBox = wrapper.find(Checkbox);
  checkBox.simulate("click");

  expect(newProps.onSelectAllClick).toBeCalledWith(true);
  expect(newProps.onSelectAllClick).toHaveBeenCalledTimes(1);
});

test("should trigger onSelectAllClick callback and pass false when checkbox clicked and selected and total counts match", () => {
  const newProps = {
    ...props,
    onSelectAllClick: jest.fn(),
    selectedItemCount: 100,
    totalItems: 100
  };

  const wrapper = shallow(<ActionRow {...newProps} />);
  const checkBox = wrapper.find(Checkbox);
  checkBox.simulate("click");

  expect(newProps.onSelectAllClick).toBeCalledWith(false);
  expect(newProps.onSelectAllClick).toHaveBeenCalledTimes(1);
});
