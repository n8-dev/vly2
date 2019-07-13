import styled from 'styled-components'
import React, { PureComponent } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import FilterContainer from './FilterContainer'
import { FormattedMessage } from 'react-intl';

export const SearchContainer = styled.div`
  padding: 1.5rem;
  margin-top: 0rem;
  margin-bottom: 2rem;
  /* width: 80rem; */
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 2px 2px 12px 0 rgba(117, 117, 117, 0.5);
  border-radius: 8px;
  position: relative;

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    width: calc(100vw - 4rem);
  }

  @media screen and (max-width: 767px) {
    width: calc(100vw - 2rem);
  }
`

const SearchTitle = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  letter-spacing: -0.5px;
  font-weight: 700;
  color: black;
`

const Search = ({ children, onSearch, search}) => {
    return (
        <>
            <SearchContainer>
                <SearchTitle>Search</SearchTitle>
                    <Input.Search
                        size='large'
                        placeholder="try 'building robots' "
                        enterButton={<FormattedMessage id="search.title" defaultMessage="Search" />}
                        defaultValue={search}
                        onSearch={onSearch}
                    />
                {children}
            </SearchContainer>
        </>
      );
  }

Search.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
}

export default Search
