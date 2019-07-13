import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { FilterItem } from "../BigSearch";
import { Popover, Button, Select, Form as AntdForm } from "antd";
import DatePickerComponent, {
  formatDateBaseOn
} from "../../../pages/search/DatePickerComponent";
import DatePickerType from "../../Op/DatePickerType.constant";

const Option = Select.Option;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Form = styled(AntdForm)`
  > *:last-child {
    margin-right: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000vw;
`;

class DateFilter extends Component {
  state = {
    datePickerType: DatePickerType.IndividualDate,
    popoverValue: undefined,
    popoverDatePickerType: DatePickerType.IndividualDate,
    isVisible: false,
    value: undefined
  };

  constructor(props) {
    super(props);
    this.state.value = props.value;
    this.state.popoverValue = this.state.value;
  }

  handleChangeDatePickerType = datePickerType => {
    this.setState({
      popoverDatePickerType: datePickerType
    });
  };

  changePickerTypeIndividualDate = () => {
    this.setState({ popoverDatePickerType: DatePickerType.IndividualDate });
  };

  changePickerTypeWeekRange = () => {
    this.setState({ popoverDatePickerType: DatePickerType.WeekRange });
  };

  changePickerTypeMonthRange = () => {
    this.setState({ popoverDatePickerType: DatePickerType.MonthRange });
  };

  changePickerTypeDateRange = () => {
    this.setState({ popoverDatePickerType: DatePickerType.DateRange });
  };

  handleChange = popoverValue => {
    this.setState({ popoverValue });
  };

  handleVisibleChange = isVisible => {
    this.setState({ isVisible });
  };

  handleCancel = () => {
    this.setState({ isVisible: false });
  };

  handleSubmit = () => {
    const { popoverValue, popoverDatePickerType } = this.state;

    this.setState(
      {
        isVisible: false,
        value: popoverValue,
        datePickerType: popoverDatePickerType
      },
      () => {
        this.props.onChange(popoverValue);
      }
    );
  };

  renderLabel = () => {
    const { value, datePickerType } = this.state;

    if (!value || (Array.isArray(value) && value.length === 0)) {
      return (
        <FormattedMessage id="search.filter.date.label" defaultMessage="Date" />
      );
    }

    return formatDateBaseOn(datePickerType, value);
  };

  render() {
    const {
      datePickerType,
      isVisible,
      value,
      popoverValue,
      popoverDatePickerType
    } = this.state;

    const content = (
      <Content>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Select
              placeholder={
                <FormattedMessage
                  id="search.filter.date.picker.option.date.label"
                  defaultMessage="Date"
                />
              }
              onChange={this.handleChangeDatePickerType}
              defaultValue={datePickerType}
              style={{ width: 200 }}
            >
              <Option key="by-date" value={DatePickerType.IndividualDate}>
                <FormattedMessage
                  id="search.filter.date.option.date.label"
                  defaultMessage="Specific date"
                />
              </Option>
              <Option key="by-week" value={DatePickerType.WeekRange}>
                <FormattedMessage
                  id="search.filter.date.option.week.label"
                  defaultMessage="Week"
                />
              </Option>
              <Option key="by-month" value={DatePickerType.MonthRange}>
                <FormattedMessage
                  id="search.filter.date.option.month.label"
                  defaultMessage="Month"
                />
              </Option>
              <Option key="by-date-range" value={DatePickerType.DateRange}>
                <FormattedMessage
                  id="search.filter.date.option.dateRange.label"
                  defaultMessage="Date-range"
                />
              </Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <DatePickerComponent
              datePickerType={popoverDatePickerType}
              onDateChange={this.handleChange}
              dateValue={popoverValue}
            />
          </Form.Item>
        </Form>
        <Footer>
          <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Button onClick={this.handleCancel}>
              <FormattedMessage id="search.filter.popover.cancel.label" defaultMessage="Cancel" />
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} type="primary">
              <FormattedMessage id="search.filter.popover.submit.label" defaultMessage="Apply filter" />
            </Button>
          </Form.Item>
          </Form>
        </Footer>
      </Content>
    );

    return (
      <Popover
        placement="bottom"
        title={
          <FormattedMessage
            id="search.filter.date.label"
            defaultMessage="Date"
          />
        }
        content={content}
        trigger="click"
        onVisibleChange={this.handleVisibleChange}
        visible={isVisible}
      >
        <FilterItem>{this.renderLabel()}</FilterItem>
      </Popover>
    );
  }
}

DateFilter.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  onChange: PropTypes.func.isRequired
};

export default DateFilter;
