import styled from 'styled-components'
import React, { Children } from 'react'
import { FormattedMessage } from 'react-intl';

const SearchFilterText = styled.p`
  font-size: 1rem;
  letter-spacing: -0.5px;
  font-weight: 500;
  color: #333;
  font-weight: bold;
`

const Container = styled.div`
  display: flex;
  > * {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 0;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }


  @media screen and (max-width: 767px) {
    flex-direction: column;

  > * {
    margin: 0;
    padding: 0.5rem;
    padding-left: 0;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
  }
`;

const FilterItem = styled.div`
  max-width: 20rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

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
            {Children.map(children, (child) => (<FilterItem>{child}</FilterItem>))}
        </Container>
      );
  }

Filters.propTypes = {
  
}

export default Filters
