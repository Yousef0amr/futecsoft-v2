import React from 'react'
import FilterStatisFormFields from './FilterStatisFormFields'

const FilterStatisForm = ({ onSubmit, filter }) => {
    return (
        <FilterStatisFormFields setFilter={onSubmit} filter={filter} />
    )
}

export default FilterStatisForm
