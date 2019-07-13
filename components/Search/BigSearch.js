import styled from "styled-components";
import React, { PureComponent } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import FilterPopover from "./FilterPopover";
import LocationFilter from "./Filters/LocationFilter";
import Search from "./Search";
import Filters from "./Filters";
import DateFilter from "./Filters/DateFilter";

export const SearchContainer = styled.div`
  margin-top: 0rem;
  width: 80rem;
  background: #ffffff;
  box-shadow: 2px 2px 12px 0 rgba(117, 117, 117, 0.5);
  border-radius: 8px;

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    width: calc(100vw - 4rem);
  }

  @media screen and (max-width: 767px) {
    width: calc(100vw - 2rem);
  }
`;

export const FilterItem = styled.a`
  float: left;
  margin-top: 1rem;
  margin-right: 0.5rem;
  width: 8rem;
  text-align: center;
  font-weight: bold;
`;

class BigSearch extends PureComponent {
  state = {
    showFilterPopover: false,
    selectedLocation: undefined,
    dateValue: []
  };

  handleLocation = location => {
    this.setState({ selectedLocation: location });
  };

  showFilterDetails = () => {
    this.setState({ showFilterPopover: !this.state.showFilterPopover });
  };

  filterApplied = () => {
    // Reason for using set state callback https://stackoverflow.com/questions/42038590/when-to-use-react-setstate-callback
    this.setState({ showFilterPopover: !this.state.showFilterPopover }, () => {
      this.props.onFilterChange(this.state.selectedLocation);
    });
  };

  cancelFilter = () => {
    this.setState({ selectedLocation: undefined, showFilterPopover: false });
    this.props.onFilterChange(null);
  };

  handleDateChange = (value) => {
    this.setState({ dateValue: value });
  };

  render() {
    const {
      onSearch,
      search,
      locations,
      onClickDateFilter,
      dateLabel
    } = this.props;

    const {
      showFilterPopover,
      selectedLocation,
      dateValue
    } = this.state;

    return (
      <Search search={search} onSearch={onSearch}>
        <Filters>
          {/* <FilterItem onClick={onClickDateFilter}>
            {dateLabel}
          </FilterItem> */}
          <DateFilter value={dateValue} onChange={this.handleDateChange}/>
          <FilterItem onClick={this.showFilterDetails}>
            {this.state.selectedLocation == null
              ? "Location"
              : this.state.selectedLocation}
          </FilterItem>
        </Filters>
        {!!showFilterPopover && (
          <FilterPopover
            onFilterApplied={this.filterApplied}
            onCancel={this.cancelFilter}
          >
            <LocationFilter
              locations={locations}
              value={selectedLocation}
              onChange={this.handleLocation}
            />
          </FilterPopover>
        )}
      </Search>
    );
  }
}

BigSearch.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickDateFilter: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  dateLabel: PropTypes.string
};

export default BigSearch;
