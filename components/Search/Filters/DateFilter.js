import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { FilterItem } from "../BigSearch";
import { Popover, Button, Dropdown, Menu } from "antd";
import DatePickerComponent from "../../../pages/search/DatePickerComponent";
import DatePickerType from "../../Op/DatePickerType.constant";


class DateFilter extends Component {
  state = {
    datePickerType: DatePickerType.IndividualDate
  }
  changePickerType = type => {
    this.setState({ datePickerType: type });
  };

  render() {
    const { locations, onChange, value, onClickDateFilter } = this.props;
    const content = (
      <div>
        <Dropdown overlay={DatePickerOption} placement="bottomCenter" trigger={["click"]}>
          <Button>
            {this.state.datePickerType === ""
              ? <FormattedMessage id="search.filter.date.picker.option.date.label" defaultMessage="Date" />
              : this.state.datePickerType}
          </Button>
        </Dropdown>
        <DatePickerComponent
          datePickerType={this.state.datePickerType}
          onDateChange={this.handleDateChange}
          dateValue={value}
        />
      </div>
    )

    const DatePickerOption = (
      <Menu>
        <Menu.Item key="0"
          onClick={() => this.changePickerType(DatePickerType.IndividualDate)}
        >
          <p>
            <FormattedMessage
              id="search.filter.date.option.date.label"
              defaultMessage="Specific date"
            />
          </p>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => this.changePickerType(DatePickerType.WeekRange)}>
          <p>
            <FormattedMessage
              id="search.filter.date.option.week.label"
              defaultMessage="Week"
            /></p>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => this.changePickerType(DatePickerType.MonthRange)}>
          <p>
            <FormattedMessage
              id="search.filter.date.option.month.label"
              defaultMessage="Month"
            /></p>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => this.changePickerType(DatePickerType.DateRange)}>
          <p>
            <FormattedMessage
              id="search.filter.date.option.dateRange.label"
              defaultMessage="Date-range"
            /></p>
        </Menu.Item>
      </Menu>
    )

    return (
      <Popover placement="bottom" title={<FormattedMessage
        id="search.filter.date.label" defaultMessage="Date"
      />} content={content} trigger="click">
        <FilterItem>
          <FormattedMessage
            id="search.filter.date.label" defaultMessage="Date"
          />
        </FilterItem>
      </Popover>
    )
  }
}

DateFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default DateFilter;
