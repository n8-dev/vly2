import styled from 'styled-components'
import React, { PureComponent } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import FilterContainer from './FilterContainer'
import LocationFilter from './Filters/LocationFilter'
import Search from './Search';
import Filters from './Filters';

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


`
const SearchInputContainer = styled.div`
  width: 79rem;
  padding-left: 1rem;

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    width: calc(100vw - 6rem);
  }

  @media screen and (max-width: 767px) {
    width: calc(100vw - 4rem);
  }
`

const SearchTitle = styled.p`
  padding-left: 1rem;
  padding-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  letter-spacing: -0.5px;
  font-weight: 700;
  color: black;
`

const SearchFilterText = styled.p`
  padding-left: 1rem;
  padding-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  letter-spacing: -0.5px;
  font-weight: 500;
  color: #333;
  float: left;
`

const FilterItem = styled.a`
  float: left;
  margin-top: 1rem;
  margin-right: 0.5rem;
  width: 8rem;
  text-align: center;
  font-weight: bold;
`

class BigSearch extends PureComponent {
  state = {
    filterShowing: false,
    selectedLocation: undefined
  }

  handleLocation = location => {
    this.setState({ selectedLocation: location })
  }

  showFilterDetails = () => {
    this.setState({ filterShowing: !this.state.filterShowing })
  }

  filterApplied = () => {
    // Reason for using set state callback https://stackoverflow.com/questions/42038590/when-to-use-react-setstate-callback
    this.setState({ filterShowing: !this.state.filterShowing }, () => {
      this.props.onFilterChange(this.state.selectedLocation)
    })
  }

  cancelFilter = () => {
    this.setState({ selectedLocation: undefined, filterShowing: false })
    this.props.onFilterChange(null)
  }

  render () {
    const { onSearch, search, locations, onClickDateFilter, dateLabel } = this.props
    const { filterShowing, selectedLocation } = this.state
    return (
      <Search search={search} onSearch={onSearch}>
        <Filters>
          <FilterItem onClick={() => onClickDateFilter()}>{dateLabel}</FilterItem>
          <FilterItem onClick={this.showFilterDetails}>{ this.state.selectedLocation == null ? 'Location' : this.state.selectedLocation}</FilterItem>
        </Filters>
      {filterShowing &&
      <FilterContainer onFilterApplied={this.filterApplied} onCancel={this.cancelFilter}>
        <LocationFilter
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelected={this.handleLocation} />
      </FilterContainer>}
      </Search>)
  }
}

BigSearch.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickDateFilter: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  dateLabel: PropTypes.string
}

export default BigSearch
