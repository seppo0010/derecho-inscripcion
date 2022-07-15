import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function Filters({ availableFilters, filters, setFilters }) {
  return (
      <Autocomplete
        fullWidth={true}
        multiple
        id="fixed-tags-demo"
        value={filters}
        onChange={(event, newValue) => {
          setFilters(newValue);
        }}
        options={(availableFilters || [])}
        getOptionLabel={(option) => option.title}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.title}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Filtros" />
        )}
      />
  );
}
export default Filters;