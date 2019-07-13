import styled from 'styled-components'
import React from 'react'
import { FormattedMessage } from 'react-intl';

const SearchFilterText = styled.p`
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 0rem;
  font-size: 1rem;
  letter-spacing: -0.5px;
  font-weight: 500;
  color: #333;
  font-weight: bold;
`

const Container = styled.div`
  display: flex;
`;

const Filters = ({ children }) => {
    return (
        <Container>
            <SearchFilterText>
              <FormattedMessage
                id='search.filter.title'
                defaultMessage='Filter by:'
                description='Title text displayed on left of search filters'
              />
            </SearchFilterText>
            {children}
        </Container>
      );
  }

Filters.propTypes = {
  
}

export default Filters
