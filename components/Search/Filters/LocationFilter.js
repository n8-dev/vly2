import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import OpLocationSelector from '../../Op/OpLocationSelector'
import { TextPBold } from '../../VTheme/VTheme'
import styled from 'styled-components'

const LocationFilterContainer = styled.div`
    display: flex;
    flex-direction: column;

    > * {
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    }
`;

class LocationFilter extends React.Component {
  render () {
    const { locations, onLocationSelected, selectedLocation } = this.props
    return (
      <LocationFilterContainer>
        <TextPBold>
          <FormattedMessage
            id='location-filter-description'
            defaultMessage='Find opportunities in...'
            description='Text that describes what the location filter does'
          />
        </TextPBold>
        <OpLocationSelector
          existingLocations={locations}
          value={selectedLocation}
          onChange={onLocationSelected}
        />
      </LocationFilterContainer>
    )
  }
}

LocationFilter.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string),
  selectedLocation: PropTypes.string,
  onLocationSelected: PropTypes.func.isRequired
}

export default LocationFilter
