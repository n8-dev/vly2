import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { SearchContainer as DetailsContainer } from "./BigSearch";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const FilterButton = styled.div`
  line-height: 1.5;
  margin-left: 10px;
`;

// intended to be a reusable component for displaying filter input components and details (passed in as children)
// generic behaviour is that a filter can be applied and cancelled
// TODO: allow this to be variable height so that it can handle having more children without overflowing
const FilterPopover = ({ children, onFilterApplied, onCancel }) => (
  <Container>
    <DetailsContainer>
      <Wrapper>
        {children}
        <FilterButtons>
          <FilterButton>
            <Button onClick={onCancel} type="secondary" shape="round">
              <FormattedMessage
                id="op-search-cancel-filter"
                defaultMessage="Cancel"
                description="Button that removes a filter from search results"
              />
            </Button>
          </FilterButton>
          <FilterButton>
            <Button onClick={onFilterApplied} type="primary" shape="round">
              <FormattedMessage
                id="op-search-apply-filter"
                defaultMessage="Ok"
                description="Button that applies a filter to search results"
              />
            </Button>
          </FilterButton>
        </FilterButtons>
      </Wrapper>
    </DetailsContainer>
  </Container>
);

FilterPopover.propTypes = {
  onFilterApplied: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default FilterPopover;
